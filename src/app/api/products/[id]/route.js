import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import fs from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [id]);

    if (result.length === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.formData();
    const image = data.get("image");
    let publicPath = null;

    if (!data.get("name")) {
      return NextResponse.json(
        { message: "Nombre es requerido" },
        { status: 400 },
      );
    }

    const updatedData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
    };

    if (image && image instanceof File && image.size > 0) {
      const currentProducts = await conn.query(
        "SELECT image FROM product WHERE id = ?",
        [id],
      );
      const oldImagePath = currentProducts[0]?.image;

      if (oldImagePath) {
        const absoluteOldPath = path.join(
          process.cwd(),
          "public",
          oldImagePath,
        );

        try {
          await fs.unlink(absoluteOldPath);
        } catch (unlinkError) {
          if (unlinkError.code !== "ENOENT") {
            console.error(unlinkError.message);
          }
        }
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExtension = path.extname(image.name || ".jpg");
      const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFilename);

      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(filePath, buffer);

      publicPath = `/uploads/${uniqueFilename}`;
      updatedData.image = publicPath;
    }

    const result = await conn.query("UPDATE product SET ? WHERE id = ?", [
      updatedData,
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 },
      );
    }

    const updatedProducts = await conn.query(
      "SELECT * FROM product WHERE id = ?",
      [id],
    );

    return NextResponse.json({ product: updatedProducts[0] });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await conn.query("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
