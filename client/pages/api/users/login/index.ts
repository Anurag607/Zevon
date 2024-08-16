import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // let userData: string = "";
    // try {
    //   userData = await readFile(
    //     new URL("/src/data/data.json", import.meta.url),
    //     "utf-8"
    //   );
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(201).send({ message: "Error while logging in (R)." });
    // }

    // let users = JSON.parse(userData);

    // if (users.hasOwnProperty(req.body.username)) {
    //   if (users[req.body.username] === req.body.password) {
    //     let userDetails = [
    //       {
    //         name: `${req.body.username}`,
    //       },
    //     ];
    //     res.status(200).send(userDetails);
    //   } else {
    //     res.status(201).send({ message: "invalid password" });
    //   }
    // } else {
    //   res.status(201).send({ message: "invalid username" });
    // }

    let userData: string = "";
    try {
      userData = await readFile("./src/data/data.json", "utf-8");
    } catch (err) {
      console.error(err.message);
      res.send("Error while logging in (R).");
    }

    let users = JSON.parse(userData);
    if (users.hasOwnProperty(req.body.username)) {
      if (users[req.body.userName] == req.body.password) {
        res.send("success");
      } else {
        res.send("invalid password");
      }
    } else {
      res.send("invalid username");
    }
  }
}
export default handler;
