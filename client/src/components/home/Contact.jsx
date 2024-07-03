import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section id="contact" className="bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-xl space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Contactez-nous</h2>
            <p className="text-muted-foreground">
              Vous avez une question ou souhaitez travailler ensemble ?
              Remplissez le formulaire ci-dessous et nous vous répondrons dans
              les plus brefs délais.
            </p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" placeholder="Enter votre nom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter votre email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter votre message"
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
