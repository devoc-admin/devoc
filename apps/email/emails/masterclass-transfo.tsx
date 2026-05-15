import { Link } from "@react-email/components";
import TemplateEmail from "./template";

type MasterClassTransfoEmail = typeof TemplateEmail;

const linkInline = {
  color: "#e5e7eb",
  textDecoration: "underline" as const,
};

export const MasterClassTransfoEmail = () => (
  <TemplateEmail
    closingData="En vous souhaitant le meilleur dans vos projets entrepreneuriaux !"
    cta={{
      href: "https://drive.google.com/file/d/1tFSGJ-wunNxSBuv1UsKHhVRVWcJtVcmh/view?usp=sharing",
      icon: "🎤",
      text: "Lien de la présentation",
    }}
    gdprData="Vous recevez ce message car vous avez participé à une présentation « Réussir sa transformation numérique en 2026 » du 30 mars 2026 à Alpha'R. Conformément au RGPD, vous pouvez demander la suppression de vos données à tout moment sur simple réponse à ce mail."
    headingData="Bonjour,"
    paragraphs={[
      <strong>
        Vous avez assisté lundi dernier à une masterclass intitulée «{" "}
        <u>Réussir sa transformation numérique en 2026</u> » et animée par{" "}
        <u>
          <Link href="https://www.dev-oc.fr/" style={linkInline}>
            notre collectif Dev'Oc
          </Link>
        </u>
        .
      </strong>,
      <strong>
        Nous espérons que cette présentation vous a plu et que vous avez pu en
        ressortir avec des idées plus claires sur les sujets que nous avons
        abordés à cette occasion ! 😊
      </strong>,
      <strong>
        Vos questions et échanges ont rendu ce moment particulièrement
        enrichissant, et c'est exactement ce type de dialogue que nous
        souhaitons encourager 🙌
      </strong>,
      <strong>
        Vous pouvez dès à présent retrouver le support de cette présentation au
        format pdf en cliquant sur le lien ci-dessous 👇
      </strong>,
    ]}
    previewData="Merci pour votre participation à notre masterclass !"
  />
);

export default MasterClassTransfoEmail;
