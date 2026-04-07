import { Request, Response } from "express";

type WeevilName = "acorn" | "rice" | "snout";

type Weevil = {
  fact: string;
  type: string;
};

const weevils: Record<WeevilName, Weevil> = {
  acorn: { fact: "Acorn weevils drill into nuts!", type: "cute" },
  rice: { fact: "Rice weevils infest stored grains!", type: "pest" },
  snout: { fact: "Weevils are known for their long snouts!", type: "cool" }
};

//
// GET /weevils/:name
//
export const getWeevil = (request: Request, response: Response) => {
  const name = (request.params.name as string).toLowerCase();

  const weevil = weevils[name as WeevilName];

  if (!weevil) {
    return response.status(404).json({ error: "Weevil not found" });
  }

  response.json({
    name,
    fact: weevil.fact,
    type: weevil.type
  });
};

//
// GET /weevils/search?type=cute
//
export const searchWeevils = (request: Request, response: Response) => {
  const type = (request.query.type as string | undefined)?.toLowerCase();

  if (!type) {
    return response.status(400).json({ error: "Type query is required" });
  }

  const results = (Object.keys(weevils) as WeevilName[]).filter(
    (w) => weevils[w].type.toLowerCase() === type
  );

  response.json({ results });
};

//
// POST /weevils
//
export const addWeevil = (request: Request, response: Response) => {
  const { name, fact, type } = request.body;

  if (!name || !fact || !type) {
    return response
      .status(400)
      .json({ error: "Missing fields (name, fact, type required)" });
  }

  const key = name.toLowerCase() as WeevilName;

  if ((Object.keys(weevils) as WeevilName[]).includes(key)) {
    return response.status(409).json({ error: "Weevil already exists" });
  }

  weevils[key] = {
    fact,
    type: type.toLowerCase()
  };

  response.status(201).json({
    message: "Weevil added successfully",
    weevil: {
      name: key,
      fact,
      type: type.toLowerCase()
    }
  });
};