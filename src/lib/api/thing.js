/* import { supabase } from "./supabaseClient";

const game = async (req, res) => {
  const id = req.query.id;
  switch (req.method) {
    case 'PATCH':
      let { data: patchGameData, error: PatchError } = await supabase
        .from("games")
        .update(JSON.parse(req.body))
        .eq("id", id)

        if (patchGameData) {
          res.json(patchGameData[0]);
        } else {
          res.json(PatchError);
        }
    break;

    case 'GET':
      let { data: gameData, error: GetError } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)

      if (gameData) {
        res.json(gameData[0]);
      } else {
        res.json(GetError);
      }
    break;
  }
};

export default game;
 */