export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className=" container w-full py-6 md:py-24 lg:py-32"
    >
      <div className=" grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-left">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            QUI SOMMES-NOUS?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:mx-0">
            Bienvenue sur notre site e-commerce dédié à la vente de livres !
            Notre mission est de vous offrir une expérience d'achat en ligne
            simple, agréable et enrichissante, tout en ayant un impact positif
            sur notre planète. Nous croyons fermement que chaque petit geste
            compte pour la préservation de l'environnement. C'est pourquoi, pour
            chaque livre acheté sur notre site, nous nous engageons à reverser
            1€ à l'association "Un livre, un arbre, une vie". Cette initiative
            permet de planter des arbres et de contribuer à la reforestation, en
            transformant chaque achat de livre en un acte concret pour la
            planète.
          </p>
        </div>
        <img
          src="http://localhost:5173/img1.png"
          alt="Company Image"
          width={480}
          height={480}
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
        />
      </div>
    </section>
  );
}
