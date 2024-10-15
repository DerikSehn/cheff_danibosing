import Image from "next/image";
import { GradientHeading } from "../ui/gradient-heading";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Image
                className="object-cover brightness-50"
                fill
                alt="Fundo do Herói"
                src={"/background/hero.jpeg"}
            />
            <span className="absolute inset-0 bg-gradient-to-b from-primary-200/80 via-primary-200/10 to-primary-200/80 brightness-[.2]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container px-4 md:px-6 text-center">
                    <div className="space-y-4 text-white">
                        <h1 className="text-4xl max-w-screen-lg mx-auto font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            O seu evento com a melhor Gastronomia do RS
                        </h1>
                        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                            Monte seu cardápio personalizado com os melhores pratos doces e salgados para o seu evento, e deixe que cuidamos do resto.
                        </p>
                        <div className="flex justify-center">
                            <Link href={'/cardapio'} target="_blank" className="flex items-center justify-center w-[200px]  ">
                                <Button
                                    variant={'default'}
                                    className="text-md transition-all bg-white text-black hover:text-white w-full font-montserrat"
                                >
                                    Montar Cardápio
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
