"use client";
import { useBackdrop } from "@/hooks/useBackdrop";
import { subscribe, unsubscribe } from "@/utils/events";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { resizeImage } from "@/utils/utils";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const ImageDialog = ({ imageUrl, setImageUrl, setImageBlob }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState(imageUrl);
  const [imageBlob, setPreviewImageBlob] = useState<Blob | null>(null);

  const dialogRef = useBackdrop(setIsOpen);

  const onSelectImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const blob = await resizeImage(file, 1000);
      const url = URL.createObjectURL(blob);
      setPreviewImageBlob(blob);
      setPreviewImageUrl(url);
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: (error as any).message,
      });
    }
  };

  const onClick = () => {
    setImageBlob(imageBlob);
    setImageUrl(previewImageUrl);
    setIsOpen(false);
  };

  useEffect(() => {
    subscribe("openImageDialog", () => setIsOpen(true));
    return () => {
      unsubscribe("openImageDialog", () => setIsOpen(true));
    };
  }, []);

  return isOpen ? (
    <div className="fixed top-0 right-0 w-screen h-screen bg-blur above-map ">
      <div ref={dialogRef} className={`absolute absolute-center text-[15px] card p-5 w-[95vw] h-[95vh] `}>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Subir foto</h1>
            <CloseIcon className="size-8" onClick={() => setIsOpen(false)} />
          </div>
          <Alert variant="informative">
            <Info className="h-4 w-4" />
            <AlertTitle>Indicaciones</AlertTitle>
            <AlertDescription>
              Tome una foto horizontal de la fachada del templo de dia donde se pueda identificar fácilmente.
              La actualización de la imagen puede tardar unos minutos en reflejarse en la página principal.
            </AlertDescription>
          </Alert>

          <Input name="imagen" type="file" onChange={onSelectImage} accept="image/*" />
          <div className="relative grow">
            {previewImageUrl && (
              <Image
                src={previewImageUrl}
                className="rounded-lg object-contain"
                fill
                sizes="95vw"
                alt="Foto iglesia"
              />
            )}
          </div>
          {previewImageUrl !== imageUrl && (
            <Button type="button" className="self-end" onClick={onClick}>
              Aceptar
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
