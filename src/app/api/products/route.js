import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM product");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!data.get("name")) {
      return NextResponse.json(
        { message: "Nombre es requerido" },
        { status: 400 },
      );
    }

    let publicPath = null;

    if (image && image instanceof File && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExtension = path.extname(image.name || ".jpg");
      const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFilename);

      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(filePath, buffer);

      publicPath = `/uploads/${uniqueFilename}`;
    }

    const productData = {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
    };

    if (publicPath) {
      productData.image = publicPath;
    }

    const result = await conn.query("INSERT INTO product SET ?", productData);

    return NextResponse.json(
      {
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
        image_url: publicPath,
        id: result.insertId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
