import { pool } from "../db.js";

export const GetTest = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM post_test AS result");
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const GetTestById = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query("SELECT * FROM post_test WHERE id = ?", [
      id,
    ]);

    if (result.length <= 0) {
      return res.status(404).send("Object not found");
    }

    console.log(id);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const PostTest = async (req, res) => {
  const body = req.body;
  console.log(body.test);
  try {
    const [idk] = await pool.query("INSERT INTO post_test (test) VALUES (?)", [
      body.test,
    ]);
    res.send({ test: body.test, id: idk.insertId });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const PutTest = async (req, res) => {
  const id = Number(req.params.id);
  const info = req.body;

  if (typeof id !== "number" || isNaN(id) === true) {
    return res.status(406).send("Id is not a number");
  }
  try {
    const [rows] = await pool.query(
      "UPDATE post_test SET test = ? WHERE id = ?",
      [info.test, id]
    );

    if (rows.affectedRows <= 0) {
      return res.status(404).send("Object not found");
    }

    console.log({ id: id, test: info.test });

    res.send("Updated correctly");
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const DeleteTest = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("DELETE FROM post_test WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows <= 0) {
      return res.status(404).send("Object not found");
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
