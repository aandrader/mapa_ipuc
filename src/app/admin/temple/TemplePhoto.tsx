import Image from "next/image";
import { ImageDialog } from "./ImageDialog";
import { publish } from "@/utils";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  imageUrl: string | false;
  readOnly: boolean;
  setImageBlob: Dispatch<SetStateAction<Blob | null>>;
  setImageUrl: Dispatch<SetStateAction<string | false>>;
}

export const TemplePhoto = ({ imageUrl, readOnly, setImageBlob, setImageUrl }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <p>Foto</p>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-[230px_auto] ">
        <div className="relative w-[230px] h-[230px] grid place-items-center rounded-lg bg-slate-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              className="rounded-lg object-cover"
              fill
              sizes="300px"
              alt="Foto iglesia"
              unoptimized
            />
          ) : (
            <span className="font-medium text-slate-500">Sin imagen</span>
          )}
        </div>
        {!readOnly && (
          <div className="flex flex-col gap-2">
            <Button type="button" className="w-min" onClick={() => publish("openImageDialog")}>
              Actualizar imagen
            </Button>
            <ImageDialog imageUrl={imageUrl} setImageUrl={setImageUrl} setImageBlob={setImageBlob} />
          </div>
        )}
      </div>
    </div>
  );
};
