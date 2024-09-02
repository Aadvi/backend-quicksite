import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataPath = path.resolve("data", "pages.json");

// Ensure data directory exists
if (!fs.existsSync(path.resolve("data"))) {
  fs.mkdirSync(path.resolve("data"));
}

// Ensure the pages.json file exists
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([], null, 2), "utf-8");
}

const readData = () => {
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

// @desc    Get all pages
// @route   GET /api/pages
// @access  Public
export const getPages = (req, res) => {
  try {
    const pages = readData();
    res.json(pages);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a page
// @route   POST /api/pages
// @access  Private
export const createPage = (req, res) => {
  const { name, slug, content } = req.body;

  // Input validation
  if (!name || !slug || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const pages = readData();

    // Check for duplicate slug
    if (pages.some((page) => page.slug === slug)) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const newPage = {
      _id: uuidv4(),
      name,
      slug,
      content,
      createdAt: new Date(),
    };
    pages.push(newPage);
    writeData(pages);
    res.status(201).json(newPage);
  } catch (error) {
    console.error("Error writing data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
