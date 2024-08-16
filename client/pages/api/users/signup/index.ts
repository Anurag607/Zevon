import { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile } from "fs/promises";

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
    //   res.status(202).send({ message: "Error while signing in (R)." });
    // }

    // let users = JSON.parse(userData);
    // if (users.hasOwnProperty(req.body.username)) {
    //   res.status(201).send({ message: "Username Alreadt Exists" });
    // } else {
    //   users[req.body.username] = req.body.password;
    //   try {
    //     await writeFile(
    //       new URL("/src/data/data.json", import.meta.url),
    //       JSON.stringify(users)
    //     );
    //     let userDetails = [
    //       {
    //         name: `${req.body.username}`,
    //       },
    //     ];
    //     res.status(200).send(userDetails);
    //   } catch (err) {
    //     console.error(err.message);
    //     res.status(202).send({ message: "Error while signing in (W)." });
    //   }
    // }

    let userData: string = "";
    try {
      userData = await readFile("./src/data/data.json", "utf-8");
    } catch (err) {
      console.error(err.message);
      res.send("Error while signing in (R).");
    }

    let users = JSON.parse(userData);
    if (users.hasOwnProperty(req.body.username)) {
      res.send("Username conflict");
    } else {
      users[req.body.username] = req.body.pass;
      try {
        await writeFile("./data/data.json", JSON.stringify(users));
      } catch (err) {
        console.error(err.message);
        res.send("Error while signing in (W).");
      }
    }
  }
}
export default handler;
