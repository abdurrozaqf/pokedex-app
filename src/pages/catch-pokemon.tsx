import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Pokemon, getDetailPokemon } from "@/utils/apis";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

import BackgroundCatch2 from "../assets/bg-catch-2.png";
import BackgroundCatch from "../assets/bg-catch.jpg";

import { Loader2 } from "lucide-react";

const getDatafromLS = () => {
  const data = localStorage.getItem("myPokemon");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const CatchPokemon = () => {
  const [dataPokemon, setDataPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState(getDatafromLS());
  console.log(pokemons);

  const [catchPokemon, setCatchPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnSave, setBtnSave] = useState(true);

  const [nickname, setNickname] = useState("");

  const { toast } = useToast();
  const params = useParams();

  const handleAddPokemon = (e: any) => {
    e.preventDefault();

    let myPokemons = {
      nickname,
      data_pokemon: dataPokemon,
    };
    setPokemons([...pokemons, myPokemons]);
    setNickname("");
    setCatchPokemon(false);

    toast({
      title: "Great Job!!!",
      description: "Pokemons now already in your My Pokemon",
      variant: "default",
    });
  };

  const handleNickname = (e: any) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    setBtnSave(false);

    pokemons.map((items: any) => {
      if (newNickname === items.nickname) {
        setBtnSave(true);
        toast({
          title: "Opss!!!",
          description: "Opss! nickname is already",
          variant: "destructive",
        });
      }
    });
  };

  const rateCatch = () => {
    setCatchPokemon(false);
    let rate = +(Math.random() * 100).toFixed(0);

    if (rate >= 50) {
      setCatchPokemon(true);
      toast({
        title: "Congratulation!!!",
        description: "Yeyy! You catch the pokemon.",
        variant: "default",
      });
    } else {
      setCatchPokemon(false);
      toast({
        title: "Opss!",
        description: "Opss! You missed catch pokemon.",
        variant: "destructive",
      });
    }
  };

  async function fetchDetail() {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const detailResponse = await getDetailPokemon(params.name!);

        setDataPokemon(detailResponse);
        setIsLoading(false);
      }, 500);
    } catch (error: any) {
      toast({
        title: "Opss!",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchDetail();
    localStorage.setItem("myPokemon", JSON.stringify(pokemons));
  }, [pokemons]);

  return (
    <Layout>
      <div className="w-full h-full flex flex-col bg-catch-dark relative">
        <figure className="w-full h-full absolute z-[1]">
          <img
            src={BackgroundCatch2}
            className="h-full invisible dark:visible object-cover"
          />
        </figure>
        <figure className="w-full h-full absolute z-[1]">
          <img
            src={BackgroundCatch}
            className="h-full visible dark:invisible object-cover"
          />
        </figure>

        {isLoading ? (
          <div className="h-full w-full flex grow items-center justify-center absolute z-[2]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </div>
        ) : (
          <>
            <div className="w-full h-1/3 flex flex-col items-center justify-center z-[2]">
              <p
                className="p-4 rounded-lg text-white bg-green-700 dark:bg-green-700 border-4
               border-white"
              >
                This is{" "}
                {dataPokemon?.name.charAt(0).toUpperCase() +
                  dataPokemon?.name.slice(1)!}
              </p>
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${dataPokemon?.id}.svg`}
              className="w-auto h-[8rem] mt-[15rem] absolute z-[2] left-[40%] grayscale-0 dark:grayscale-[50%]"
            />
            <div className="w-full h-full flex flex-col items-center justify-end bottom-10 absolute z-[2]">
              <Button
                onClick={() => rateCatch()}
                className="w-fit bg-white hover:bg-neutral-200 text-black h-auto px-5 font-extrabold"
              >
                CATCH
              </Button>
            </div>
          </>
        )}
        {catchPokemon && (
          <div className="w-full h-full bg-black/60 absolute  z-[4] flex justify-center items-center">
            <div className="w-fit h-fit px-10 py-5 bg-neutral-900 dark:bg-indigo-950 border-8 dark:border-white dark:border-4 rounded-3xl absolute z-[5] text-white">
              <p className="text-center mb-5 text-3xl font-extrabold">
                Congratulation!!!
              </p>
              <p className="text-center mb-5 text-xl font-light">
                You caught
                <br />
                <span className="text-2xl font-semibold">
                  {dataPokemon?.name.charAt(0).toUpperCase() +
                    dataPokemon?.name.slice(1)!}
                </span>
              </p>
              <form
                autoComplete="off"
                className="h-full flex flex-col items-center"
                onSubmit={handleAddPokemon}
              >
                <label>Nickname</label>
                <input
                  type="text"
                  required
                  className="text-black rounded-full px-2 text-center"
                  onChange={handleNickname}
                  value={nickname}
                ></input>
                <br></br>
                {}
                <Button
                  disabled={btnSave}
                  type="submit"
                  className="h-fit border-2 border-white"
                >
                  save
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CatchPokemon;
