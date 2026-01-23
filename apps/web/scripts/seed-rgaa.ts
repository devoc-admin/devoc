import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { rgaaCriterion, rgaaTest, rgaaTheme } from "../lib/db/schema";

const sql = neon(process.env.DATABASE_URL ?? "");
const db = drizzle(sql);

type ThemeData = {
  number: number;
  name: string;
};

type CriterionData = {
  themeNumber: number;
  number: string;
  title: string;
  wcagCriteria: string | null;
  wcagLevel: "A" | "AA" | "AAA" | null;
  testability: "automatic" | "semi_automatic" | "manual";
};

type TestData = {
  criterionNumber: string;
  number: string;
  description: string;
};

const themes: ThemeData[] = [
  { name: "Images", number: 1 },
  { name: "Cadres", number: 2 },
  { name: "Couleurs", number: 3 },
  { name: "Multimédia", number: 4 },
  { name: "Tableaux", number: 5 },
  { name: "Liens", number: 6 },
  { name: "Scripts", number: 7 },
  { name: "Éléments obligatoires", number: 8 },
  { name: "Structuration de l'information", number: 9 },
  { name: "Présentation de l'information", number: 10 },
  { name: "Formulaires", number: 11 },
  { name: "Navigation", number: 12 },
  { name: "Consultation", number: 13 },
];

const criteria: CriterionData[] = [
  // Theme 1: Images
  {
    number: "1.1",
    testability: "semi_automatic",
    themeNumber: 1,
    title:
      "Chaque image porteuse d'information a-t-elle une alternative textuelle ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.2",
    testability: "semi_automatic",
    themeNumber: 1,
    title:
      "Chaque image de décoration est-elle correctement ignorée par les technologies d'assistance ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.3",
    testability: "manual",
    themeNumber: 1,
    title:
      "Pour chaque image porteuse d'information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.4",
    testability: "manual",
    themeNumber: 1,
    title:
      "Pour chaque image utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.5",
    testability: "manual",
    themeNumber: 1,
    title:
      "Pour chaque image utilisée comme CAPTCHA, une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.6",
    testability: "manual",
    themeNumber: 1,
    title:
      "Chaque image porteuse d'information a-t-elle, si nécessaire, une description détaillée ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.7",
    testability: "manual",
    themeNumber: 1,
    title:
      "Pour chaque image porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "1.8",
    testability: "manual",
    themeNumber: 1,
    title:
      "Chaque image texte porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    wcagCriteria: "1.4.5",
    wcagLevel: "AA",
  },
  {
    number: "1.9",
    testability: "semi_automatic",
    themeNumber: 1,
    title:
      "Chaque légende d'image est-elle, si nécessaire, correctement reliée à l'image correspondante ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },

  // Theme 2: Cadres
  {
    number: "2.1",
    testability: "automatic",
    themeNumber: 2,
    title: "Chaque cadre a-t-il un titre de cadre ?",
    wcagCriteria: "4.1.2",
    wcagLevel: "A",
  },
  {
    number: "2.2",
    testability: "manual",
    themeNumber: 2,
    title:
      "Pour chaque cadre ayant un titre de cadre, ce titre de cadre est-il pertinent ?",
    wcagCriteria: "4.1.2",
    wcagLevel: "A",
  },

  // Theme 3: Couleurs
  {
    number: "3.1",
    testability: "manual",
    themeNumber: 3,
    title:
      "Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?",
    wcagCriteria: "1.4.1",
    wcagLevel: "A",
  },
  {
    number: "3.2",
    testability: "semi_automatic",
    themeNumber: 3,
    title:
      "Dans chaque page web, le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?",
    wcagCriteria: "1.4.3",
    wcagLevel: "AA",
  },
  {
    number: "3.3",
    testability: "semi_automatic",
    themeNumber: 3,
    title:
      "Dans chaque page web, les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées (hors cas particuliers) ?",
    wcagCriteria: "1.4.11",
    wcagLevel: "AA",
  },

  // Theme 4: Multimédia
  {
    number: "4.1",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média temporel pré-enregistré a-t-il, si nécessaire, une transcription textuelle ou une audiodescription (hors cas particuliers) ?",
    wcagCriteria: "1.2.1,1.2.3",
    wcagLevel: "A",
  },
  {
    number: "4.2",
    testability: "manual",
    themeNumber: 4,
    title:
      "Pour chaque média temporel pré-enregistré ayant une transcription textuelle ou une audiodescription synchronisée, celles-ci sont-elles pertinentes (hors cas particuliers) ?",
    wcagCriteria: "1.2.1,1.2.3",
    wcagLevel: "A",
  },
  {
    number: "4.3",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média temporel synchronisé pré-enregistré a-t-il, si nécessaire, des sous-titres synchronisés (hors cas particuliers) ?",
    wcagCriteria: "1.2.2",
    wcagLevel: "A",
  },
  {
    number: "4.4",
    testability: "manual",
    themeNumber: 4,
    title:
      "Pour chaque média temporel synchronisé pré-enregistré ayant des sous-titres synchronisés, ces sous-titres sont-ils pertinents ?",
    wcagCriteria: "1.2.2",
    wcagLevel: "A",
  },
  {
    number: "4.5",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média temporel pré-enregistré a-t-il, si nécessaire, une audiodescription synchronisée (hors cas particuliers) ?",
    wcagCriteria: "1.2.5",
    wcagLevel: "AA",
  },
  {
    number: "4.6",
    testability: "manual",
    themeNumber: 4,
    title:
      "Pour chaque média temporel pré-enregistré ayant une audiodescription synchronisée, celle-ci est-elle pertinente ?",
    wcagCriteria: "1.2.5",
    wcagLevel: "AA",
  },
  {
    number: "4.7",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média temporel est-il clairement identifiable (hors cas particuliers) ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "4.8",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média non temporel a-t-il, si nécessaire, une alternative (hors cas particuliers) ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "4.9",
    testability: "manual",
    themeNumber: 4,
    title:
      "Pour chaque média non temporel ayant une alternative, cette alternative est-elle pertinente ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "4.10",
    testability: "semi_automatic",
    themeNumber: 4,
    title:
      "Chaque son déclenché automatiquement est-il contrôlable par l'utilisateur ?",
    wcagCriteria: "1.4.2",
    wcagLevel: "A",
  },
  {
    number: "4.11",
    testability: "manual",
    themeNumber: 4,
    title:
      "La consultation de chaque média temporel est-elle, si nécessaire, contrôlable par le clavier et tout dispositif de pointage ?",
    wcagCriteria: "2.1.1",
    wcagLevel: "A",
  },
  {
    number: "4.12",
    testability: "manual",
    themeNumber: 4,
    title:
      "La consultation de chaque média non temporel est-elle contrôlable par le clavier et tout dispositif de pointage ?",
    wcagCriteria: "2.1.1",
    wcagLevel: "A",
  },
  {
    number: "4.13",
    testability: "manual",
    themeNumber: 4,
    title:
      "Chaque média temporel et non temporel est-il compatible avec les technologies d'assistance (hors cas particuliers) ?",
    wcagCriteria: "4.1.2",
    wcagLevel: "A",
  },

  // Theme 5: Tableaux
  {
    number: "5.1",
    testability: "semi_automatic",
    themeNumber: 5,
    title: "Chaque tableau de données complexe a-t-il un résumé ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.2",
    testability: "manual",
    themeNumber: 5,
    title:
      "Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.3",
    testability: "manual",
    themeNumber: 5,
    title:
      "Pour chaque tableau de mise en forme, le contenu linéarisé reste-t-il compréhensible ?",
    wcagCriteria: "1.3.2",
    wcagLevel: "A",
  },
  {
    number: "5.4",
    testability: "semi_automatic",
    themeNumber: 5,
    title:
      "Pour chaque tableau de données ayant un titre, le titre est-il correctement associé au tableau de données ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.5",
    testability: "manual",
    themeNumber: 5,
    title:
      "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.6",
    testability: "semi_automatic",
    themeNumber: 5,
    title:
      "Pour chaque tableau de données, chaque en-tête de colonnes et chaque en-tête de lignes sont-ils correctement déclarés ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.7",
    testability: "semi_automatic",
    themeNumber: 5,
    title:
      "Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée (hors cas particuliers) ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "5.8",
    testability: "semi_automatic",
    themeNumber: 5,
    title:
      "Chaque tableau de mise en forme ne doit pas utiliser d'éléments propres aux tableaux de données. Cette règle est-elle respectée ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },

  // Theme 6: Liens
  {
    number: "6.1",
    testability: "manual",
    themeNumber: 6,
    title: "Chaque lien est-il explicite (hors cas particuliers) ?",
    wcagCriteria: "2.4.4",
    wcagLevel: "A",
  },
  {
    number: "6.2",
    testability: "semi_automatic",
    themeNumber: 6,
    title: "Dans chaque page web, chaque lien a-t-il un intitulé ?",
    wcagCriteria: "2.4.4",
    wcagLevel: "A",
  },

  // Theme 7: Scripts
  {
    number: "7.1",
    testability: "manual",
    themeNumber: 7,
    title:
      "Chaque script est-il, si nécessaire, compatible avec les technologies d'assistance ?",
    wcagCriteria: "4.1.2",
    wcagLevel: "A",
  },
  {
    number: "7.2",
    testability: "manual",
    themeNumber: 7,
    title:
      "Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "7.3",
    testability: "manual",
    themeNumber: 7,
    title:
      "Chaque script est-il contrôlable par le clavier et par tout dispositif de pointage (hors cas particuliers) ?",
    wcagCriteria: "2.1.1",
    wcagLevel: "A",
  },
  {
    number: "7.4",
    testability: "manual",
    themeNumber: 7,
    title:
      "Pour chaque script qui initie un changement de contexte, l'utilisateur est-il averti ou en a-t-il le contrôle ?",
    wcagCriteria: "3.2.1,3.2.2",
    wcagLevel: "A",
  },
  {
    number: "7.5",
    testability: "manual",
    themeNumber: 7,
    title:
      "Dans chaque page web, les messages de statut sont-ils correctement restitués par les technologies d'assistance ?",
    wcagCriteria: "4.1.3",
    wcagLevel: "AA",
  },

  // Theme 8: Éléments obligatoires
  {
    number: "8.1",
    testability: "automatic",
    themeNumber: 8,
    title: "Chaque page web est-elle définie par un type de document ?",
    wcagCriteria: "4.1.1",
    wcagLevel: "A",
  },
  {
    number: "8.2",
    testability: "automatic",
    themeNumber: 8,
    title:
      "Pour chaque page web, le code source généré est-il valide selon le type de document spécifié ?",
    wcagCriteria: "4.1.1",
    wcagLevel: "A",
  },
  {
    number: "8.3",
    testability: "automatic",
    themeNumber: 8,
    title: "Dans chaque page web, la langue par défaut est-elle présente ?",
    wcagCriteria: "3.1.1",
    wcagLevel: "A",
  },
  {
    number: "8.4",
    testability: "semi_automatic",
    themeNumber: 8,
    title:
      "Pour chaque page web ayant une langue par défaut, le code de langue est-il pertinent ?",
    wcagCriteria: "3.1.1",
    wcagLevel: "A",
  },
  {
    number: "8.5",
    testability: "automatic",
    themeNumber: 8,
    title: "Chaque page web a-t-elle un titre de page ?",
    wcagCriteria: "2.4.2",
    wcagLevel: "A",
  },
  {
    number: "8.6",
    testability: "manual",
    themeNumber: 8,
    title:
      "Pour chaque page web ayant un titre de page, ce titre est-il pertinent ?",
    wcagCriteria: "2.4.2",
    wcagLevel: "A",
  },
  {
    number: "8.7",
    testability: "semi_automatic",
    themeNumber: 8,
    title:
      "Dans chaque page web, chaque changement de langue est-il indiqué dans le code source (hors cas particuliers) ?",
    wcagCriteria: "3.1.2",
    wcagLevel: "AA",
  },
  {
    number: "8.8",
    testability: "manual",
    themeNumber: 8,
    title:
      "Dans chaque page web, le code de langue de chaque changement de langue est-il valide et pertinent ?",
    wcagCriteria: "3.1.2",
    wcagLevel: "AA",
  },
  {
    number: "8.9",
    testability: "manual",
    themeNumber: 8,
    title:
      "Dans chaque page web, les balises ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "8.10",
    testability: "semi_automatic",
    themeNumber: 8,
    title:
      "Dans chaque page web, les changements du sens de lecture sont-ils signalés ?",
    wcagCriteria: "1.3.2",
    wcagLevel: "A",
  },

  // Theme 9: Structuration de l'information
  {
    number: "9.1",
    testability: "semi_automatic",
    themeNumber: 9,
    title:
      "Dans chaque page web, l'information est-elle structurée par l'utilisation appropriée de titres ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "9.2",
    testability: "semi_automatic",
    themeNumber: 9,
    title:
      "Dans chaque page web, la structure du document est-elle cohérente (hors cas particuliers) ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "9.3",
    testability: "semi_automatic",
    themeNumber: 9,
    title:
      "Dans chaque page web, chaque liste est-elle correctement structurée ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "9.4",
    testability: "semi_automatic",
    themeNumber: 9,
    title:
      "Dans chaque page web, chaque citation est-elle correctement indiquée ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },

  // Theme 10: Présentation de l'information
  {
    number: "10.1",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans le site web, des feuilles de styles sont-elles utilisées pour contrôler la présentation de l'information ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "10.2",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, le contenu visible porteur d'information reste-t-il présent lorsque les feuilles de styles sont désactivées ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "10.3",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, l'information reste-t-elle compréhensible lorsque les feuilles de styles sont désactivées ?",
    wcagCriteria: "1.3.2",
    wcagLevel: "A",
  },
  {
    number: "10.4",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200%, au moins (hors cas particuliers) ?",
    wcagCriteria: "1.4.4",
    wcagLevel: "AA",
  },
  {
    number: "10.5",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans chaque page web, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées ?",
    wcagCriteria: "1.4.8",
    wcagLevel: "AAA",
  },
  {
    number: "10.6",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, chaque lien dont la nature n'est pas évidente est-il visible par rapport au texte environnant ?",
    wcagCriteria: "1.4.1",
    wcagLevel: "A",
  },
  {
    number: "10.7",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans chaque page web, pour chaque élément recevant le focus, la prise de focus est-elle visible ?",
    wcagCriteria: "2.4.7",
    wcagLevel: "AA",
  },
  {
    number: "10.8",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Pour chaque page web, les contenus cachés ont-ils vocation à être ignorés par les technologies d'assistance ?",
    wcagCriteria: "1.3.2",
    wcagLevel: "A",
  },
  {
    number: "10.9",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    wcagCriteria: "1.3.3",
    wcagLevel: "A",
  },
  {
    number: "10.10",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?",
    wcagCriteria: "1.3.3",
    wcagLevel: "A",
  },
  {
    number: "10.11",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Pour chaque page web, les contenus peuvent-ils être présentés sans avoir recours à un défilement vertical pour une fenêtre ayant une hauteur de 256 px ou à un défilement horizontal pour une fenêtre ayant une largeur de 320 px (hors cas particuliers) ?",
    wcagCriteria: "1.4.10",
    wcagLevel: "AA",
  },
  {
    number: "10.12",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans chaque page web, les propriétés d'espacement du texte peuvent-elles être redéfinies par l'utilisateur sans perte de contenu ou de fonctionnalité (hors cas particuliers) ?",
    wcagCriteria: "1.4.12",
    wcagLevel: "AA",
  },
  {
    number: "10.13",
    testability: "semi_automatic",
    themeNumber: 10,
    title:
      "Dans chaque page web, les contenus additionnels apparaissant à la prise de focus ou au survol d'un composant d'interface sont-ils contrôlables par l'utilisateur (hors cas particuliers) ?",
    wcagCriteria: "1.4.13",
    wcagLevel: "AA",
  },
  {
    number: "10.14",
    testability: "manual",
    themeNumber: 10,
    title:
      "Dans chaque page web, les contenus additionnels apparaissant via les styles CSS uniquement peuvent-ils être rendus visibles au clavier et par tout dispositif de pointage ?",
    wcagCriteria: "1.4.13",
    wcagLevel: "AA",
  },

  // Theme 11: Formulaires
  {
    number: "11.1",
    testability: "semi_automatic",
    themeNumber: 11,
    title: "Chaque champ de formulaire a-t-il une étiquette ?",
    wcagCriteria: "1.3.1,4.1.2",
    wcagLevel: "A",
  },
  {
    number: "11.2",
    testability: "manual",
    themeNumber: 11,
    title:
      "Chaque étiquette associée à un champ de formulaire est-elle pertinente (hors cas particuliers) ?",
    wcagCriteria: "2.4.6",
    wcagLevel: "AA",
  },
  {
    number: "11.3",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, chaque étiquette associée à un champ de formulaire ayant la même fonction et répété plusieurs fois dans une même page ou dans un ensemble de pages est-elle cohérente ?",
    wcagCriteria: "3.2.4",
    wcagLevel: "AA",
  },
  {
    number: "11.4",
    testability: "semi_automatic",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, chaque étiquette de champ et son champ associé sont-ils accolés (hors cas particuliers) ?",
    wcagCriteria: "3.3.2",
    wcagLevel: "A",
  },
  {
    number: "11.5",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, les champs de même nature sont-ils regroupés, si nécessaire ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "11.6",
    testability: "semi_automatic",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, chaque regroupement de champs de formulaire a-t-il une légende ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "11.7",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, chaque légende associée à un regroupement de champs de même nature est-elle pertinente ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "11.8",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, les items de même nature d'une liste de choix sont-ils regroupés de manière pertinente ?",
    wcagCriteria: "1.3.1",
    wcagLevel: "A",
  },
  {
    number: "11.9",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, l'intitulé de chaque bouton est-il pertinent (hors cas particuliers) ?",
    wcagCriteria: "2.4.6",
    wcagLevel: "AA",
  },
  {
    number: "11.10",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, le contrôle de saisie est-il utilisé de manière pertinente (hors cas particuliers) ?",
    wcagCriteria: "3.3.1,3.3.2",
    wcagLevel: "A",
  },
  {
    number: "11.11",
    testability: "manual",
    themeNumber: 11,
    title:
      "Dans chaque formulaire, le contrôle de saisie est-il accompagné, si nécessaire, de suggestions facilitant la correction des erreurs de saisie ?",
    wcagCriteria: "3.3.3",
    wcagLevel: "AA",
  },
  {
    number: "11.12",
    testability: "manual",
    themeNumber: 11,
    title:
      "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou à un examen, ou dont la validation a des conséquences financières ou juridiques, les données saisies peuvent-elles être modifiées, mises à jour ou récupérées par l'utilisateur ?",
    wcagCriteria: "3.3.4",
    wcagLevel: "AA",
  },
  {
    number: "11.13",
    testability: "semi_automatic",
    themeNumber: 11,
    title:
      "La finalité d'un champ de saisie peut-elle être déduite pour faciliter le remplissage automatique des champs avec les données de l'utilisateur ?",
    wcagCriteria: "1.3.5",
    wcagLevel: "AA",
  },

  // Theme 12: Navigation
  {
    number: "12.1",
    testability: "manual",
    themeNumber: 12,
    title:
      "Chaque ensemble de pages dispose-t-il de deux systèmes de navigation différents, au moins (hors cas particuliers) ?",
    wcagCriteria: "2.4.5",
    wcagLevel: "AA",
  },
  {
    number: "12.2",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque ensemble de pages, le menu et les barres de navigation sont-ils toujours à la même place (hors cas particuliers) ?",
    wcagCriteria: "3.2.3",
    wcagLevel: "AA",
  },
  {
    number: "12.3",
    testability: "manual",
    themeNumber: 12,
    title: "La page « plan du site » est-elle pertinente ?",
    wcagCriteria: "2.4.5",
    wcagLevel: "AA",
  },
  {
    number: "12.4",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque ensemble de pages, la page « plan du site » est-elle atteignable de manière identique ?",
    wcagCriteria: "3.2.3",
    wcagLevel: "AA",
  },
  {
    number: "12.5",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque ensemble de pages, le moteur de recherche est-il atteignable de manière identique ?",
    wcagCriteria: "3.2.3",
    wcagLevel: "AA",
  },
  {
    number: "12.6",
    testability: "semi_automatic",
    themeNumber: 12,
    title:
      "Les zones de regroupement de contenus présentes dans plusieurs pages web (zones d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche) peuvent-elles être atteintes ou évitées ?",
    wcagCriteria: "2.4.1",
    wcagLevel: "A",
  },
  {
    number: "12.7",
    testability: "semi_automatic",
    themeNumber: 12,
    title:
      "Dans chaque page web, un lien d'évitement ou un lien d'accès rapide à la zone de contenu principal est-il présent (hors cas particuliers) ?",
    wcagCriteria: "2.4.1",
    wcagLevel: "A",
  },
  {
    number: "12.8",
    testability: "manual",
    themeNumber: 12,
    title: "Dans chaque page web, l'ordre de tabulation est-il cohérent ?",
    wcagCriteria: "2.4.3",
    wcagLevel: "A",
  },
  {
    number: "12.9",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque page web, la navigation ne doit pas contenir de piège au clavier. Cette règle est-elle respectée ?",
    wcagCriteria: "2.1.2",
    wcagLevel: "A",
  },
  {
    number: "12.10",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque page web, les raccourcis clavier n'utilisant qu'une seule touche (lettre minuscule ou majuscule, ponctuation, chiffre ou symbole) sont-ils contrôlables par l'utilisateur ?",
    wcagCriteria: "2.1.4",
    wcagLevel: "A",
  },
  {
    number: "12.11",
    testability: "manual",
    themeNumber: 12,
    title:
      "Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?",
    wcagCriteria: "2.1.1",
    wcagLevel: "A",
  },

  // Theme 13: Consultation
  {
    number: "13.1",
    testability: "manual",
    themeNumber: 13,
    title:
      "Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque limite de temps modifiant le contenu (hors cas particuliers) ?",
    wcagCriteria: "2.2.1",
    wcagLevel: "A",
  },
  {
    number: "13.2",
    testability: "semi_automatic",
    themeNumber: 13,
    title:
      "Dans chaque page web, l'ouverture d'une nouvelle fenêtre ne doit pas être déclenchée sans action de l'utilisateur. Cette règle est-elle respectée ?",
    wcagCriteria: "3.2.1",
    wcagLevel: "A",
  },
  {
    number: "13.3",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, chaque document bureautique en téléchargement possède-t-il, si nécessaire, une version accessible (hors cas particuliers) ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "13.4",
    testability: "manual",
    themeNumber: 13,
    title:
      "Pour chaque document bureautique ayant une version accessible, cette version offre-t-elle la même information ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "13.5",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, chaque contenu cryptique (art ASCII, émoticône, syntaxe cryptique) a-t-il une alternative ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "13.6",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, pour chaque contenu cryptique (art ASCII, émoticône, syntaxe cryptique) ayant une alternative, cette alternative est-elle pertinente ?",
    wcagCriteria: "1.1.1",
    wcagLevel: "A",
  },
  {
    number: "13.7",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, les changements brusques de luminosité ou les effets de flash sont-ils correctement utilisés ?",
    wcagCriteria: "2.3.1",
    wcagLevel: "A",
  },
  {
    number: "13.8",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, chaque contenu en mouvement ou clignotant est-il contrôlable par l'utilisateur ?",
    wcagCriteria: "2.2.2",
    wcagLevel: "A",
  },
  {
    number: "13.9",
    testability: "semi_automatic",
    themeNumber: 13,
    title:
      "Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?",
    wcagCriteria: "1.3.4",
    wcagLevel: "AA",
  },
  {
    number: "13.10",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, les fonctionnalités utilisables par un geste complexe peuvent-elles être également disponibles via un geste simple (hors cas particuliers) ?",
    wcagCriteria: "2.5.1",
    wcagLevel: "A",
  },
  {
    number: "13.11",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, les actions déclenchées au moyen d'un dispositif de pointage sur un point unique de l'écran peuvent-elles faire l'objet d'une annulation (hors cas particuliers) ?",
    wcagCriteria: "2.5.2",
    wcagLevel: "A",
  },
  {
    number: "13.12",
    testability: "manual",
    themeNumber: 13,
    title:
      "Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être satisfaites de manière alternative (hors cas particuliers) ?",
    wcagCriteria: "2.5.4",
    wcagLevel: "A",
  },
];

const tests: TestData[] = [
  // Theme 1: Images
  {
    criterionNumber: "1.1",
    description:
      "Chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.1",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque zone (balise <area>) d'une image réactive porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.2",
  },
  {
    criterionNumber: "1.1",
    description:
      'Chaque bouton de type image (balise <input> avec l\'attribut type="image") a-t-il une alternative textuelle ?',
    number: "1.1.3",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque zone (balise <area>) d'une image réactive, utilisée comme lien, a-t-elle une alternative textuelle ?",
    number: "1.1.4",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.5",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque image embarquée (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.6",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque image vectorielle (balise <svg>) porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.7",
  },
  {
    criterionNumber: "1.1",
    description:
      "Chaque image bitmap (balise <canvas>) porteuse d'information a-t-elle une alternative textuelle ?",
    number: "1.1.8",
  },

  {
    criterionNumber: "1.2",
    description:
      "Chaque image (balise <img>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    number: "1.2.1",
  },
  {
    criterionNumber: "1.2",
    description:
      "Chaque zone non cliquable (balise <area> sans attribut href) de décoration vérifie-t-elle une de ces conditions ?",
    number: "1.2.2",
  },
  {
    criterionNumber: "1.2",
    description:
      'Chaque image objet (balise <object> avec l\'attribut type="image/...") de décoration, sans légende, vérifie-t-elle une de ces conditions ?',
    number: "1.2.3",
  },
  {
    criterionNumber: "1.2",
    description:
      "Chaque image vectorielle (balise <svg>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    number: "1.2.4",
  },
  {
    criterionNumber: "1.2",
    description:
      "Chaque image bitmap (balise <canvas>) de décoration, sans légende, vérifie-t-elle une de ces conditions ?",
    number: "1.2.5",
  },
  {
    criterionNumber: "1.2",
    description:
      'Chaque image embarquée (balise <embed> avec l\'attribut type="image/...") de décoration, sans légende, vérifie-t-elle une de ces conditions ?',
    number: "1.2.6",
  },

  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.1",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque zone (balise <area>) d'une image réactive porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.2",
  },
  {
    criterionNumber: "1.3",
    description:
      'Pour chaque bouton de type image (balise <input> avec l\'attribut type="image"), ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?',
    number: "1.3.3",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque zone (balise <area>) d'une image réactive, utilisée comme lien, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.4",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.5",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image embarquée (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.6",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.7",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?",
    number: "1.3.8",
  },
  {
    criterionNumber: "1.3",
    description:
      "Pour chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas> ou possédant un attribut WAI-ARIA role=\"img\") porteuse d'information, ayant une alternative textuelle, l'alternative textuelle est-elle courte et concise (hors cas particuliers) ?",
    number: "1.3.9",
  },

  {
    criterionNumber: "1.4",
    description:
      "Pour chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role=\"img\") utilisée comme CAPTCHA ou comme image-test, ayant une alternative textuelle, cette alternative permet-elle d'identifier la nature et la fonction de l'image ?",
    number: "1.4.1",
  },

  {
    criterionNumber: "1.5",
    description:
      'Chaque image (balise <img>, <area>, <object>, <embed>, <svg>, <canvas>, ou possédant un attribut WAI-ARIA role="img") utilisée comme CAPTCHA vérifie-t-elle une de ces conditions ?',
    number: "1.5.1",
  },
  {
    criterionNumber: "1.5",
    description:
      'Chaque bouton associé à un CAPTCHA image (balise <input> avec l\'attribut type="image") vérifie-t-il une de ces conditions ?',
    number: "1.5.2",
  },

  {
    criterionNumber: "1.6",
    description:
      "Chaque image (balise <img>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    number: "1.6.1",
  },
  {
    criterionNumber: "1.6",
    description:
      "Chaque bouton de type image (balise <input> avec l'attribut type=\"image\") porteur d'information, qui nécessite une description détaillée, vérifie-t-il une de ces conditions ?",
    number: "1.6.2",
  },
  {
    criterionNumber: "1.6",
    description:
      "Chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    number: "1.6.3",
  },
  {
    criterionNumber: "1.6",
    description:
      "Chaque image embarquée (balise <embed>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    number: "1.6.4",
  },
  {
    criterionNumber: "1.6",
    description:
      "Chaque image vectorielle (balise <svg>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    number: "1.6.5",
  },
  {
    criterionNumber: "1.6",
    description:
      "Chaque image bitmap (balise <canvas>) porteuse d'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?",
    number: "1.6.6",
  },
  {
    criterionNumber: "1.6",
    description:
      "Pour chaque image (balise <img>, <input> avec l'attribut type=\"image\", <object>, <embed>, <svg>, <canvas>) porteuse d'information, qui nécessite une description détaillée et qui utilise un attribut WAI-ARIA aria-describedby, la propriété WAI-ARIA aria-describedby référence-t-elle la description détaillée ?",
    number: "1.6.7",
  },
  {
    criterionNumber: "1.6",
    description:
      'Chaque image (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img") porteuse d\'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?',
    number: "1.6.8",
  },
  {
    criterionNumber: "1.6",
    description:
      'Chaque balise possédant un attribut WAI-ARIA role="img" porteuse d\'information, qui nécessite une description détaillée, vérifie-t-elle une de ces conditions ?',
    number: "1.6.9",
  },
  {
    criterionNumber: "1.6",
    description:
      'Chaque image (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img") porteuse d\'information, qui implémente une description détaillée, et qui utilise une propriété WAI-ARIA aria-describedby, vérifie-t-elle ces conditions ?',
    number: "1.6.10",
  },

  {
    criterionNumber: "1.7",
    description:
      "Pour chaque image (balise <img> ou balise possédant l'attribut WAI-ARIA role=\"img\") porteuse d'information ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.1",
  },
  {
    criterionNumber: "1.7",
    description:
      "Pour chaque bouton de type image (balise <input> avec l'attribut type=\"image\") porteur d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.2",
  },
  {
    criterionNumber: "1.7",
    description:
      "Pour chaque image objet (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.3",
  },
  {
    criterionNumber: "1.7",
    description:
      "Pour chaque image embarquée (balise <embed>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.4",
  },
  {
    criterionNumber: "1.7",
    description:
      "Pour chaque image vectorielle (balise <svg>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.5",
  },
  {
    criterionNumber: "1.7",
    description:
      "Pour chaque image bitmap (balise <canvas>) porteuse d'information, ayant une description détaillée, cette description est-elle pertinente ?",
    number: "1.7.6",
  },

  {
    criterionNumber: "1.8",
    description:
      "Chaque image texte (balise <img> ou possédant un attribut WAI-ARIA role=\"img\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.1",
  },
  {
    criterionNumber: "1.8",
    description:
      "Chaque bouton « image texte » (balise <input> avec l'attribut type=\"image\") porteur d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacé par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.2",
  },
  {
    criterionNumber: "1.8",
    description:
      "Chaque image objet texte (balise <object> avec l'attribut type=\"image/...\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.3",
  },
  {
    criterionNumber: "1.8",
    description:
      "Chaque image embarquée texte (balise <embed> avec l'attribut type=\"image/...\") porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.4",
  },
  {
    criterionNumber: "1.8",
    description:
      "Chaque image vectorielle texte (balise <svg>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.5",
  },
  {
    criterionNumber: "1.8",
    description:
      "Chaque image bitmap texte (balise <canvas>) porteuse d'information, en l'absence d'un mécanisme de remplacement, doit si possible être remplacée par du texte stylé. Cette règle est-elle respectée (hors cas particuliers) ?",
    number: "1.8.6",
  },

  {
    criterionNumber: "1.9",
    description:
      'Chaque image pourvue d\'une légende (balise <img>, <input> avec l\'attribut type="image" ou possédant un attribut WAI-ARIA role="img" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?',
    number: "1.9.1",
  },
  {
    criterionNumber: "1.9",
    description:
      "Chaque image objet pourvue d'une légende (balise <object> avec l'attribut type=\"image/...\" associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    number: "1.9.2",
  },
  {
    criterionNumber: "1.9",
    description:
      "Chaque image embarquée pourvue d'une légende (balise <embed> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    number: "1.9.3",
  },
  {
    criterionNumber: "1.9",
    description:
      "Chaque image vectorielle pourvue d'une légende (balise <svg> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    number: "1.9.4",
  },
  {
    criterionNumber: "1.9",
    description:
      "Chaque image bitmap pourvue d'une légende (balise <canvas> associée à une légende adjacente) vérifie-t-elle, si nécessaire, ces conditions ?",
    number: "1.9.5",
  },

  // Theme 2: Cadres
  {
    criterionNumber: "2.1",
    description:
      "Chaque cadre (balise <iframe> ou <frame>) a-t-il un attribut title ?",
    number: "2.1.1",
  },
  {
    criterionNumber: "2.2",
    description:
      "Pour chaque cadre (balise <iframe> ou <frame>) ayant un attribut title, le contenu de cet attribut est-il pertinent ?",
    number: "2.2.1",
  },

  // Theme 3: Couleurs
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle respectée ?",
    number: "3.1.1",
  },
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'information ne doit pas être donnée uniquement par la couleur. Cette règle est-elle implémentée de façon pertinente ?",
    number: "3.1.2",
  },
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'indication donnée par la couleur dans un texte est-elle accompagnée d'une autre méthode permettant de véhiculer cette information (hors cas particuliers) ?",
    number: "3.1.3",
  },
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'indication donnée par la couleur dans une image est-elle accompagnée d'une autre méthode permettant de véhiculer cette information (hors cas particuliers) ?",
    number: "3.1.4",
  },
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'indication donnée par la couleur dans un média temporel est-elle accompagnée d'une autre méthode permettant de véhiculer cette information (hors cas particuliers) ?",
    number: "3.1.5",
  },
  {
    criterionNumber: "3.1",
    description:
      "Dans chaque page web, l'indication donnée par la couleur dans un média non temporel est-elle accompagnée d'une autre méthode permettant de véhiculer cette information (hors cas particuliers) ?",
    number: "3.1.6",
  },

  {
    criterionNumber: "3.2",
    description:
      "Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée inférieure à 24px vérifient-ils une de ces conditions (hors cas particuliers) ?",
    number: "3.2.1",
  },
  {
    criterionNumber: "3.2",
    description:
      "Dans chaque page web, le texte et le texte en image en gras d'une taille restituée inférieure à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?",
    number: "3.2.2",
  },
  {
    criterionNumber: "3.2",
    description:
      "Dans chaque page web, le texte et le texte en image sans effet de graisse d'une taille restituée supérieure ou égale à 24px vérifient-ils une de ces conditions (hors cas particuliers) ?",
    number: "3.2.3",
  },
  {
    criterionNumber: "3.2",
    description:
      "Dans chaque page web, le texte et le texte en image en gras d'une taille restituée supérieure ou égale à 18,5px vérifient-ils une de ces conditions (hors cas particuliers) ?",
    number: "3.2.4",
  },

  {
    criterionNumber: "3.3",
    description:
      "Dans chaque page web, le rapport de contraste entre les couleurs d'un composant d'interface dans ses différents états et la couleur d'arrière-plan contiguë vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "3.3.1",
  },
  {
    criterionNumber: "3.3",
    description:
      "Dans chaque page web, le rapport de contraste entre les couleurs requises d'un élément graphique porteur d'information et ses couleurs d'arrière-plan contiguës vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "3.3.2",
  },
  {
    criterionNumber: "3.3",
    description:
      "Dans chaque page web, le rapport de contraste entre les couleurs requises d'un élément graphique porteur d'information et les couleurs requises adjacentes vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "3.3.3",
  },
  {
    criterionNumber: "3.3",
    description:
      "Dans chaque page web, le rapport de contraste entre les couleurs d'un composant d'interface dans ses différents états et la couleur d'arrière-plan contiguë vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "3.3.4",
  },

  // Theme 5: Tableaux
  {
    criterionNumber: "5.1",
    description: "Chaque tableau de données complexe a-t-il un résumé ?",
    number: "5.1.1",
  },
  {
    criterionNumber: "5.2",
    description:
      "Pour chaque tableau de données complexe ayant un résumé, celui-ci est-il pertinent ?",
    number: "5.2.1",
  },
  {
    criterionNumber: "5.3",
    description:
      "Pour chaque tableau de mise en forme, le contenu linéarisé reste-t-il compréhensible ?",
    number: "5.3.1",
  },
  {
    criterionNumber: "5.4",
    description:
      "Pour chaque tableau de données ayant un titre, le titre est-il correctement associé au tableau de données ?",
    number: "5.4.1",
  },
  {
    criterionNumber: "5.5",
    description:
      "Pour chaque tableau de données ayant un titre, ce titre est-il pertinent ?",
    number: "5.5.1",
  },
  {
    criterionNumber: "5.6",
    description:
      "Pour chaque tableau de données, chaque en-tête de colonnes est-il correctement déclaré ?",
    number: "5.6.1",
  },
  {
    criterionNumber: "5.6",
    description:
      "Pour chaque tableau de données, chaque en-tête de lignes est-il correctement déclaré ?",
    number: "5.6.2",
  },
  {
    criterionNumber: "5.7",
    description:
      "Pour chaque tableau de données, la technique appropriée permettant d'associer chaque cellule avec ses en-têtes est-elle utilisée (hors cas particuliers) ?",
    number: "5.7.1",
  },
  {
    criterionNumber: "5.8",
    description:
      "Chaque tableau de mise en forme vérifie-t-il ces conditions ?",
    number: "5.8.1",
  },

  // Theme 6: Liens
  {
    criterionNumber: "6.1",
    description:
      "Chaque lien texte vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "6.1.1",
  },
  {
    criterionNumber: "6.1",
    description:
      "Chaque lien image vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "6.1.2",
  },
  {
    criterionNumber: "6.1",
    description:
      "Chaque lien composite vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "6.1.3",
  },
  {
    criterionNumber: "6.1",
    description:
      "Chaque lien vectoriel (balise <svg>) vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "6.1.4",
  },
  {
    criterionNumber: "6.1",
    description:
      "Chaque lien ayant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ?",
    number: "6.1.5",
  },

  {
    criterionNumber: "6.2",
    description: "Dans chaque page web, chaque lien a-t-il un intitulé ?",
    number: "6.2.1",
  },

  // Theme 7: Scripts
  {
    criterionNumber: "7.1",
    description:
      "Chaque script qui génère ou contrôle un composant d'interface vérifie-t-il, si nécessaire, une de ces conditions ?",
    number: "7.1.1",
  },
  {
    criterionNumber: "7.1",
    description:
      "Chaque script qui génère ou contrôle un composant d'interface respecte-t-il une de ces conditions ?",
    number: "7.1.2",
  },
  {
    criterionNumber: "7.1",
    description:
      "Chaque script qui génère ou contrôle un composant d'interface vérifie-t-il ces conditions (hors cas particuliers) ?",
    number: "7.1.3",
  },

  {
    criterionNumber: "7.2",
    description:
      "Pour chaque script ayant une alternative, cette alternative est-elle pertinente ?",
    number: "7.2.1",
  },
  {
    criterionNumber: "7.2",
    description:
      "Pour chaque script rendant disponible une alternative à un composant d'interface non compatible avec les technologies d'assistance, l'alternative est-elle correctement restituée par les technologies d'assistance ?",
    number: "7.2.2",
  },

  {
    criterionNumber: "7.3",
    description:
      "Chaque élément possédant un gestionnaire d'événement contrôlé par un script vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "7.3.1",
  },
  {
    criterionNumber: "7.3",
    description:
      "Chaque élément possédant un gestionnaire d'événement contrôlé par un script vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "7.3.2",
  },

  {
    criterionNumber: "7.4",
    description:
      "Chaque script qui initie un changement de contexte vérifie-t-il une de ces conditions ?",
    number: "7.4.1",
  },

  {
    criterionNumber: "7.5",
    description:
      "Chaque message de statut qui informe de la réussite, du résultat d'une action ou bien de l'état d'avancement d'un processus utilise-t-il l'attribut WAI-ARIA role=\"status\" ?",
    number: "7.5.1",
  },
  {
    criterionNumber: "7.5",
    description:
      "Chaque message de statut qui présente une suggestion, ou avertit de l'existence d'une erreur utilise-t-il l'attribut WAI-ARIA role=\"alert\" ?",
    number: "7.5.2",
  },
  {
    criterionNumber: "7.5",
    description:
      'Chaque message de statut qui indique la progression d\'un processus utilise-t-il l\'un des attributs WAI-ARIA role="log", role="progressbar" ou role="status" ?',
    number: "7.5.3",
  },

  // Theme 8: Éléments obligatoires
  {
    criterionNumber: "8.1",
    description:
      "Pour chaque page web, le type de document (balise doctype) est-il présent ?",
    number: "8.1.1",
  },
  {
    criterionNumber: "8.1",
    description:
      "Pour chaque page web, le type de document (balise doctype) est-il valide ?",
    number: "8.1.2",
  },
  {
    criterionNumber: "8.1",
    description:
      "Pour chaque page web possédant une déclaration de type de document, celle-ci est-elle située avant la balise <html> dans le code source ?",
    number: "8.1.3",
  },

  {
    criterionNumber: "8.2",
    description:
      "Pour chaque page web, le code source généré est-il valide selon le type de document spécifié ?",
    number: "8.2.1",
  },

  {
    criterionNumber: "8.3",
    description:
      "Pour chaque page web, l'indication de langue par défaut vérifie-t-elle une de ces conditions ?",
    number: "8.3.1",
  },

  {
    criterionNumber: "8.4",
    description:
      "Pour chaque page web ayant une langue par défaut, le code de langue vérifie-t-il une de ces conditions ?",
    number: "8.4.1",
  },

  {
    criterionNumber: "8.5",
    description: "Chaque page web a-t-elle un titre de page (balise <title>) ?",
    number: "8.5.1",
  },

  {
    criterionNumber: "8.6",
    description:
      "Pour chaque page web ayant un titre de page, ce titre est-il pertinent ?",
    number: "8.6.1",
  },

  {
    criterionNumber: "8.7",
    description:
      "Dans chaque page web, chaque texte écrit dans une langue différente de la langue par défaut vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "8.7.1",
  },

  {
    criterionNumber: "8.8",
    description:
      "Pour chaque page web, le code de langue de chaque changement de langue est-il valide ?",
    number: "8.8.1",
  },
  {
    criterionNumber: "8.8",
    description:
      "Pour chaque page web, le code de langue de chaque changement de langue est-il pertinent ?",
    number: "8.8.2",
  },

  {
    criterionNumber: "8.9",
    description:
      "Dans chaque page web, les balises (à l'exception de <div>, <span> et <table>) ne doivent pas être utilisées uniquement à des fins de présentation. Cette règle est-elle respectée ?",
    number: "8.9.1",
  },

  {
    criterionNumber: "8.10",
    description:
      "Dans chaque page web, chaque changement du sens de lecture (balise possédant un attribut dir) vérifie-t-il ces conditions ?",
    number: "8.10.1",
  },
  {
    criterionNumber: "8.10",
    description:
      "Dans chaque page web, chaque changement du sens de lecture (balise possédant un attribut dir) est-il pertinent ?",
    number: "8.10.2",
  },

  // Theme 9: Structuration de l'information
  {
    criterionNumber: "9.1",
    description:
      'Dans chaque page web, la hiérarchie entre les titres (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-elle pertinente ?',
    number: "9.1.1",
  },
  {
    criterionNumber: "9.1",
    description:
      'Dans chaque page web, le contenu de chaque titre (balise <hx> ou balise possédant un attribut WAI-ARIA role="heading" associé à un attribut WAI-ARIA aria-level) est-il pertinent ?',
    number: "9.1.2",
  },
  {
    criterionNumber: "9.1",
    description:
      "Dans chaque page web, chaque passage de texte constituant un titre est-il structuré à l'aide d'une balise <hx> ou d'une balise possédant un attribut WAI-ARIA role=\"heading\" associé à un attribut WAI-ARIA aria-level ?",
    number: "9.1.3",
  },

  {
    criterionNumber: "9.2",
    description:
      "Dans chaque page web, la structure du document vérifie-t-elle ces conditions (hors cas particuliers) ?",
    number: "9.2.1",
  },

  {
    criterionNumber: "9.3",
    description:
      "Dans chaque page web, chaque liste non ordonnée est-elle correctement structurée ?",
    number: "9.3.1",
  },
  {
    criterionNumber: "9.3",
    description:
      "Dans chaque page web, chaque liste ordonnée est-elle correctement structurée ?",
    number: "9.3.2",
  },
  {
    criterionNumber: "9.3",
    description:
      "Dans chaque page web, chaque liste de description est-elle correctement structurée ?",
    number: "9.3.3",
  },

  {
    criterionNumber: "9.4",
    description:
      "Dans chaque page web, chaque citation courte est-elle correctement indiquée ?",
    number: "9.4.1",
  },
  {
    criterionNumber: "9.4",
    description:
      "Dans chaque page web, chaque bloc de citation est-il correctement indiqué ?",
    number: "9.4.2",
  },

  // Theme 10: Présentation de l'information
  {
    criterionNumber: "10.1",
    description:
      "Dans chaque page web, les feuilles de styles sont-elles utilisées pour contrôler la présentation de l'information ?",
    number: "10.1.1",
  },
  {
    criterionNumber: "10.1",
    description:
      "Dans chaque page web, les attributs de présentation sont-ils absents sur les éléments HTML (hors cas particuliers) ?",
    number: "10.1.2",
  },
  {
    criterionNumber: "10.1",
    description:
      "Dans chaque page web, les balises servant à la présentation sont-elles absentes dans le code source généré des pages (hors cas particuliers) ?",
    number: "10.1.3",
  },

  {
    criterionNumber: "10.2",
    description:
      "Dans chaque page web, le contenu visible reste-t-il présent lorsque les feuilles de styles sont désactivées ?",
    number: "10.2.1",
  },

  {
    criterionNumber: "10.3",
    description:
      "Dans chaque page web, l'information reste-t-elle compréhensible lorsque les feuilles de styles sont désactivées ?",
    number: "10.3.1",
  },

  {
    criterionNumber: "10.4",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200 %, au moins (hors cas particuliers) ?",
    number: "10.4.1",
  },
  {
    criterionNumber: "10.4",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200 %, au moins (hors cas particuliers) ?",
    number: "10.4.2",
  },
  {
    criterionNumber: "10.4",
    description:
      "Dans chaque page web, chaque bloc de texte reste-t-il lisible lorsque la taille des caractères est augmentée jusqu'à 200 %, au moins ?",
    number: "10.4.3",
  },

  {
    criterionNumber: "10.5",
    description:
      "Dans chaque page web, pour chaque élément recevant le focus ou faisant l'objet d'un événement ou d'une manipulation au pointeur, et qui a une couleur de police identique à celle d'un lien, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées (hors cas particuliers) ?",
    number: "10.5.1",
  },
  {
    criterionNumber: "10.5",
    description:
      "Dans chaque page web, pour chaque élément faisant l'objet d'un événement ou d'une manipulation au pointeur et qui a une couleur de police identique à celle d'un lien, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées (hors cas particuliers) ?",
    number: "10.5.2",
  },
  {
    criterionNumber: "10.5",
    description:
      "Dans chaque page web, pour chaque élément recevant le focus et qui a une couleur de police identique à celle d'un lien, les déclarations CSS de couleurs de fond d'élément et de police sont-elles correctement utilisées (hors cas particuliers) ?",
    number: "10.5.3",
  },

  {
    criterionNumber: "10.6",
    description:
      "Dans chaque page web, chaque lien dont la nature n'est pas évidente vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "10.6.1",
  },

  {
    criterionNumber: "10.7",
    description:
      "Pour chaque élément recevant le focus, la prise de focus est-elle visible ?",
    number: "10.7.1",
  },

  {
    criterionNumber: "10.8",
    description:
      "Dans chaque page web, chaque contenu caché vérifie-t-il une de ces conditions ?",
    number: "10.8.1",
  },

  {
    criterionNumber: "10.9",
    description:
      "Dans chaque page web, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    number: "10.9.1",
  },
  {
    criterionNumber: "10.9",
    description:
      "Dans chaque page web, pour chaque balise de contenu, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    number: "10.9.2",
  },
  {
    criterionNumber: "10.9",
    description:
      "Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    number: "10.9.3",
  },
  {
    criterionNumber: "10.9",
    description:
      "Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée uniquement par la forme, taille ou position. Cette règle est-elle respectée ?",
    number: "10.9.4",
  },

  {
    criterionNumber: "10.10",
    description:
      "Dans chaque page web, pour chaque balise de contenu, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?",
    number: "10.10.1",
  },
  {
    criterionNumber: "10.10",
    description:
      "Dans chaque page web, pour chaque média temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?",
    number: "10.10.2",
  },
  {
    criterionNumber: "10.10",
    description:
      "Dans chaque page web, pour chaque média non temporel, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?",
    number: "10.10.3",
  },
  {
    criterionNumber: "10.10",
    description:
      "Dans chaque page web, l'information ne doit pas être donnée par la forme, taille ou position uniquement. Cette règle est-elle implémentée de façon pertinente ?",
    number: "10.10.4",
  },

  {
    criterionNumber: "10.11",
    description:
      "Pour chaque page web, chaque contenu vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "10.11.1",
  },

  {
    criterionNumber: "10.12",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque l'espacement entre les lignes est augmenté jusqu'à 1,5 fois la taille de la police au moins ?",
    number: "10.12.1",
  },
  {
    criterionNumber: "10.12",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque l'espacement suivant les paragraphes est augmenté jusqu'à 2 fois la taille de la police au moins ?",
    number: "10.12.2",
  },
  {
    criterionNumber: "10.12",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque l'espacement entre les lettres est augmenté jusqu'à 0,12 fois la taille de la police au moins ?",
    number: "10.12.3",
  },
  {
    criterionNumber: "10.12",
    description:
      "Dans chaque page web, le texte reste-t-il lisible lorsque l'espacement des mots est augmenté jusqu'à 0,16 fois la taille de la police au moins ?",
    number: "10.12.4",
  },

  {
    criterionNumber: "10.13",
    description:
      "Dans chaque page web, chaque contenu additionnel devenant visible à la prise de focus ou au survol d'un composant d'interface peut-il être masqué par une action utilisateur sans déplacer le focus ou le pointeur de la souris (hors cas particuliers) ?",
    number: "10.13.1",
  },
  {
    criterionNumber: "10.13",
    description:
      "Dans chaque page web, chaque contenu additionnel qui apparaît au survol d'un composant d'interface peut-il être survolé par le pointeur de la souris sans disparaître (hors cas particuliers) ?",
    number: "10.13.2",
  },
  {
    criterionNumber: "10.13",
    description:
      "Dans chaque page web, chaque contenu additionnel qui apparaît à la prise de focus ou au survol d'un composant d'interface vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "10.13.3",
  },

  {
    criterionNumber: "10.14",
    description:
      "Dans chaque page web, les contenus additionnels apparaissant via les styles CSS uniquement vérifient-ils si nécessaire une de ces conditions ?",
    number: "10.14.1",
  },
  {
    criterionNumber: "10.14",
    description:
      "Dans chaque page web, les contenus additionnels apparaissant au survol d'un composant d'interface via les styles CSS uniquement sont-ils atteignables au clavier et par tout dispositif de pointage ?",
    number: "10.14.2",
  },

  // Theme 11: Formulaires
  {
    criterionNumber: "11.1",
    description:
      "Chaque champ de formulaire vérifie-t-il une de ces conditions ?",
    number: "11.1.1",
  },
  {
    criterionNumber: "11.1",
    description:
      "Chaque champ de formulaire associé à une balise <label> ayant un attribut for vérifie-t-il ces conditions ?",
    number: "11.1.2",
  },
  {
    criterionNumber: "11.1",
    description:
      "Chaque champ de formulaire associé à une balise <label> via l'attribut WAI-ARIA aria-labelledby vérifie-t-il ces conditions ?",
    number: "11.1.3",
  },

  {
    criterionNumber: "11.2",
    description:
      "Chaque étiquette (balise <label>) permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?",
    number: "11.2.1",
  },
  {
    criterionNumber: "11.2",
    description:
      "Chaque attribut title permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?",
    number: "11.2.2",
  },
  {
    criterionNumber: "11.2",
    description:
      "Chaque étiquette implémentée via l'attribut WAI-ARIA aria-label permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?",
    number: "11.2.3",
  },
  {
    criterionNumber: "11.2",
    description:
      "Chaque étiquette implémentée via l'attribut WAI-ARIA aria-labelledby permet-elle de connaître la fonction exacte du champ de formulaire auquel elle est associée ?",
    number: "11.2.4",
  },
  {
    criterionNumber: "11.2",
    description:
      "Chaque champ de formulaire ayant une étiquette dont le contenu visible permet de connaître la fonction exacte du champ vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "11.2.5",
  },
  {
    criterionNumber: "11.2",
    description:
      "Chaque bouton adjacent à un champ de formulaire qui constitue une étiquette visible permet-il de connaître la fonction exacte du champ de formulaire auquel il est associé ?",
    number: "11.2.6",
  },

  {
    criterionNumber: "11.3",
    description:
      "Chaque étiquette de champ de formulaire ayant la même fonction et répétée plusieurs fois dans une même page ou dans un ensemble de pages est-elle cohérente ?",
    number: "11.3.1",
  },
  {
    criterionNumber: "11.3",
    description:
      "Chaque étiquette de champ de formulaire qui constitue un nom de champ d'une information concernant l'utilisateur vérifie-t-elle ces conditions ?",
    number: "11.3.2",
  },

  {
    criterionNumber: "11.4",
    description:
      "Chaque étiquette de champ de formulaire est-elle visuellement accolée au champ qu'elle identifie ?",
    number: "11.4.1",
  },
  {
    criterionNumber: "11.4",
    description:
      "Chaque étiquette de champ de formulaire accolée au champ qu'elle identifie vérifie-t-elle ces conditions (hors cas particuliers) ?",
    number: "11.4.2",
  },
  {
    criterionNumber: "11.4",
    description:
      "Chaque étiquette de champ de formulaire qui utilise un attribut WAI-ARIA aria-labelledby vérifie-t-elle ces conditions ?",
    number: "11.4.3",
  },

  {
    criterionNumber: "11.5",
    description:
      "Les champs de même nature sont-ils regroupés, si nécessaire ?",
    number: "11.5.1",
  },

  {
    criterionNumber: "11.6",
    description:
      "Chaque regroupement de champs de formulaire (balise <fieldset>) est-il accompagné d'une légende (balise <legend>) ?",
    number: "11.6.1",
  },
  {
    criterionNumber: "11.6",
    description:
      'Chaque regroupement de champs de formulaire (balise possédant un attribut WAI-ARIA role="group" ou role="radiogroup") est-il accompagné d\'un nom accessible déterminé par le contenu d\'un attribut WAI-ARIA aria-label ou aria-labelledby ?',
    number: "11.6.2",
  },

  {
    criterionNumber: "11.7",
    description:
      "Chaque légende (balise <legend>) d'un regroupement de champs de formulaire (balise <fieldset>) ayant la même fonction est-elle pertinente ?",
    number: "11.7.1",
  },
  {
    criterionNumber: "11.7",
    description:
      'Chaque nom accessible d\'un regroupement de champs de formulaire (balise possédant un attribut WAI-ARIA role="group" ou role="radiogroup") ayant la même fonction est-il pertinent ?',
    number: "11.7.2",
  },

  {
    criterionNumber: "11.8",
    description:
      "Chaque liste de choix (balise <select>) est-elle structurée avec une balise <optgroup>, si nécessaire ?",
    number: "11.8.1",
  },
  {
    criterionNumber: "11.8",
    description:
      "Dans chaque liste de choix (balise <select>), chaque regroupement d'items de liste (balise <optgroup>) est-il accompagné d'un attribut label ?",
    number: "11.8.2",
  },
  {
    criterionNumber: "11.8",
    description:
      "Pour chaque liste de choix (balise <select>) ayant un regroupement d'items de liste (balise <optgroup>) avec un attribut label, le contenu de l'attribut label est-il pertinent ?",
    number: "11.8.3",
  },

  {
    criterionNumber: "11.9",
    description: "L'intitulé de chaque bouton est-il pertinent ?",
    number: "11.9.1",
  },
  {
    criterionNumber: "11.9",
    description:
      "Chaque bouton ayant un intitulé visible vérifie-t-il ces conditions (hors cas particuliers) ?",
    number: "11.9.2",
  },

  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, les erreurs de saisie vérifient-elles une de ces conditions ?",
    number: "11.10.1",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, les champs obligatoires sont-ils indiqués de manière visible ?",
    number: "11.10.2",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, les champs obligatoires ayant un type de données et/ou de format particulier vérifient-ils une de ces conditions ?",
    number: "11.10.3",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, pour chaque erreur de saisie, les types et les formats de données attendus sont-ils suggérés, si nécessaire ?",
    number: "11.10.4",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, pour chaque champ de formulaire obligatoire, l'indication de champ obligatoire est-elle accessible aux technologies d'assistance ?",
    number: "11.10.5",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, pour chaque erreur de saisie restituée, l'erreur est-elle accessible aux technologies d'assistance ?",
    number: "11.10.6",
  },
  {
    criterionNumber: "11.10",
    description:
      "Pour chaque formulaire, pour chaque champ ayant un type de donnée et/ou de format particulier, ce type de donnée et/ou de format est-il accessible aux technologies d'assistance ?",
    number: "11.10.7",
  },

  {
    criterionNumber: "11.11",
    description:
      "Pour chaque formulaire, pour chaque erreur de saisie, des suggestions facilitant la correction sont-elles proposées ?",
    number: "11.11.1",
  },
  {
    criterionNumber: "11.11",
    description:
      "Pour chaque formulaire, pour chaque erreur de saisie, les suggestions facilitant la correction sont-elles pertinentes ?",
    number: "11.11.2",
  },

  {
    criterionNumber: "11.12",
    description:
      "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, la saisie des données vérifie-t-elle une de ces conditions ?",
    number: "11.12.1",
  },
  {
    criterionNumber: "11.12",
    description:
      "Pour chaque formulaire qui modifie ou supprime des données, ou qui transmet des réponses à un test ou un examen, ou dont la validation a des conséquences financières ou juridiques, les données saisies peuvent-elles être modifiées, mises à jour ou récupérées par l'utilisateur ?",
    number: "11.12.2",
  },

  {
    criterionNumber: "11.13",
    description:
      "Chaque champ de formulaire dont l'objet se rapporte à une information concernant l'utilisateur vérifie-t-il ces conditions ?",
    number: "11.13.1",
  },

  // Theme 12: Navigation
  {
    criterionNumber: "12.1",
    description:
      "Chaque ensemble de pages dispose-t-il de deux systèmes de navigation différents, au moins (hors cas particuliers) ?",
    number: "12.1.1",
  },

  {
    criterionNumber: "12.2",
    description:
      "Dans chaque ensemble de pages, chaque page disposant d'un menu de navigation principal vérifie-t-elle ces conditions (hors cas particuliers) ?",
    number: "12.2.1",
  },

  {
    criterionNumber: "12.3",
    description:
      "Dans chaque ensemble de pages où une page « plan du site » est présente, celle-ci est-elle pertinente ?",
    number: "12.3.1",
  },
  {
    criterionNumber: "12.3",
    description:
      "Dans chaque ensemble de pages, la page « plan du site » donne-t-elle accès à l'ensemble des pages de l'ensemble de pages (hors cas particuliers) ?",
    number: "12.3.2",
  },
  {
    criterionNumber: "12.3",
    description:
      "Dans chaque ensemble de pages, tous les liens du « plan du site » sont-ils fonctionnels ?",
    number: "12.3.3",
  },

  {
    criterionNumber: "12.4",
    description:
      "Dans chaque ensemble de pages, la page « plan du site » est-elle accessible à partir d'une fonctionnalité identique ?",
    number: "12.4.1",
  },
  {
    criterionNumber: "12.4",
    description:
      "Dans chaque ensemble de pages, la page « plan du site » vérifie-t-elle ces conditions ?",
    number: "12.4.2",
  },
  {
    criterionNumber: "12.4",
    description:
      "Dans chaque ensemble de pages, le lien vers la page « plan du site » est-il situé à la même place ?",
    number: "12.4.3",
  },

  {
    criterionNumber: "12.5",
    description:
      "Dans chaque ensemble de pages, le moteur de recherche est-il accessible à partir d'une fonctionnalité identique ?",
    number: "12.5.1",
  },
  {
    criterionNumber: "12.5",
    description:
      "Dans chaque ensemble de pages, le moteur de recherche est-il situé à la même place dans la présentation ?",
    number: "12.5.2",
  },
  {
    criterionNumber: "12.5",
    description:
      "Dans chaque ensemble de pages, la fonctionnalité vers le moteur de recherche est-elle présentée toujours dans le même ordre relatif dans le code source ?",
    number: "12.5.3",
  },

  {
    criterionNumber: "12.6",
    description:
      "Dans chaque page web où elles sont présentes, la zone d'en-tête, de navigation principale, de contenu principal, de pied de page et de moteur de recherche respectent-elles au moins une de ces conditions ?",
    number: "12.6.1",
  },

  {
    criterionNumber: "12.7",
    description:
      "Dans chaque page web, un lien permet-il d'éviter chaque groupe de liens importants identifié ou d'y accéder (hors cas particuliers) ?",
    number: "12.7.1",
  },
  {
    criterionNumber: "12.7",
    description:
      "Dans chaque page web, un lien permet-il d'éviter la zone de contenu identifiée ou d'y accéder (hors cas particuliers) ?",
    number: "12.7.2",
  },

  {
    criterionNumber: "12.8",
    description:
      "Dans chaque page web, l'ordre de tabulation dans le contenu est-il cohérent ?",
    number: "12.8.1",
  },

  {
    criterionNumber: "12.9",
    description:
      "Dans chaque page web, chaque élément recevant le focus vérifie-t-il une de ces conditions ?",
    number: "12.9.1",
  },

  {
    criterionNumber: "12.10",
    description:
      "Dans chaque page web où des raccourcis clavier sont utilisés, les raccourcis clavier n'utilisant qu'une seule lettre (minuscule ou majuscule), un seul signe de ponctuation, un seul chiffre ou un seul symbole vérifient-ils l'une de ces conditions ?",
    number: "12.10.1",
  },

  {
    criterionNumber: "12.11",
    description:
      "Dans chaque page web, les contenus additionnels apparaissant au survol, à la prise de focus ou à l'activation d'un composant d'interface sont-ils, si nécessaire, atteignables au clavier ?",
    number: "12.11.1",
  },

  // Theme 13: Consultation
  {
    criterionNumber: "13.1",
    description:
      "Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque limite de temps modifiant le contenu (hors cas particuliers) ?",
    number: "13.1.1",
  },
  {
    criterionNumber: "13.1",
    description:
      "Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque procédé de rafraîchissement modifiant le contenu (hors cas particuliers) ?",
    number: "13.1.2",
  },
  {
    criterionNumber: "13.1",
    description:
      "Pour chaque page web, l'utilisateur a-t-il le contrôle de chaque procédé de redirection (hors cas particuliers) ?",
    number: "13.1.3",
  },
  {
    criterionNumber: "13.1",
    description:
      "Pour chaque document bureautique en téléchargement, l'utilisateur est-il averti de l'ouverture d'une nouvelle fenêtre ?",
    number: "13.1.4",
  },

  {
    criterionNumber: "13.2",
    description:
      "Dans chaque page web, pour chaque ouverture d'une nouvelle fenêtre effectuée via un script, l'utilisateur est-il averti ?",
    number: "13.2.1",
  },

  {
    criterionNumber: "13.3",
    description:
      "Dans chaque page web, chaque document bureautique en téléchargement vérifie-t-il une de ces conditions (hors cas particuliers) ?",
    number: "13.3.1",
  },

  {
    criterionNumber: "13.4",
    description:
      "Pour chaque document bureautique ayant une version accessible, cette version offre-t-elle la même information ?",
    number: "13.4.1",
  },

  {
    criterionNumber: "13.5",
    description:
      "Dans chaque page web, chaque contenu cryptique (art ASCII, émoticône, syntaxe cryptique) vérifie-t-il une de ces conditions ?",
    number: "13.5.1",
  },

  {
    criterionNumber: "13.6",
    description:
      "Dans chaque page web, pour chaque contenu cryptique (art ASCII, émoticône, syntaxe cryptique) ayant une alternative, l'alternative est-elle pertinente ?",
    number: "13.6.1",
  },

  {
    criterionNumber: "13.7",
    description:
      "Dans chaque page web, chaque image ou ensemble d'images véhiculant de l'information ne doit pas provoquer de changement brusque de luminosité ou d'effet de flash. Cette règle est-elle respectée ?",
    number: "13.7.1",
  },
  {
    criterionNumber: "13.7",
    description:
      "Dans chaque page web, chaque média temporel ne doit pas provoquer de changement brusque de luminosité ou d'effet de flash. Cette règle est-elle respectée ?",
    number: "13.7.2",
  },
  {
    criterionNumber: "13.7",
    description:
      "Dans chaque page web, chaque média non temporel ne doit pas provoquer de changement brusque de luminosité ou d'effet de flash. Cette règle est-elle respectée ?",
    number: "13.7.3",
  },

  {
    criterionNumber: "13.8",
    description:
      "Dans chaque page web, chaque contenu en mouvement, déclenché automatiquement, vérifie-t-il une de ces conditions ?",
    number: "13.8.1",
  },
  {
    criterionNumber: "13.8",
    description:
      "Dans chaque page web, chaque contenu clignotant déclenché automatiquement vérifie-t-il une de ces conditions ?",
    number: "13.8.2",
  },

  {
    criterionNumber: "13.9",
    description:
      "Dans chaque page web, le contenu proposé est-il consultable quelle que soit l'orientation de l'écran (portrait ou paysage) (hors cas particuliers) ?",
    number: "13.9.1",
  },

  {
    criterionNumber: "13.10",
    description:
      "Dans chaque page web, les fonctionnalités utilisables par un geste complexe sont-elles également disponibles via un geste simple (hors cas particuliers) ?",
    number: "13.10.1",
  },
  {
    criterionNumber: "13.10",
    description:
      "Dans chaque page web, les fonctionnalités utilisables par un geste complexe sont-elles également disponibles via un mécanisme alternatif équivalent (hors cas particuliers) ?",
    number: "13.10.2",
  },

  {
    criterionNumber: "13.11",
    description:
      "Dans chaque page web, pour chaque fonctionnalité de clic ou de toucher simple, au moins une de ces conditions est-elle respectée (hors cas particuliers) ?",
    number: "13.11.1",
  },

  {
    criterionNumber: "13.12",
    description:
      "Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être satisfaites d'une manière alternative (hors cas particuliers) ?",
    number: "13.12.1",
  },
  {
    criterionNumber: "13.12",
    description:
      "Dans chaque page web, les fonctionnalités qui impliquent un mouvement de l'appareil ou vers l'appareil peuvent-elles être désactivées (hors cas particuliers) ?",
    number: "13.12.2",
  },
];

async function seedRgaa() {
  console.log("🌱 Seeding RGAA data...");

  // Insert themes
  console.log("📚 Inserting themes...");
  const insertedThemes = await db
    .insert(rgaaTheme)
    .values(themes)
    .onConflictDoNothing()
    .returning();

  // Create a map of theme number to theme id
  const themeMap = new Map<number, number>();
  for (const theme of insertedThemes) {
    themeMap.set(theme.number, theme.id);
  }

  // Prepare criteria with resolved theme IDs
  const criteriaWithThemeIds = criteria.map((criterion) => ({
    number: criterion.number,
    testability: criterion.testability,
    themeId: themeMap.get(criterion.themeNumber) ?? 0,
    title: criterion.title,
    wcagCriteria: criterion.wcagCriteria,
    wcagLevel: criterion.wcagLevel,
  }));

  // Insert criteria
  console.log("📋 Inserting criteria...");
  const insertedCriteria = await db
    .insert(rgaaCriterion)
    .values(criteriaWithThemeIds)
    .onConflictDoNothing()
    .returning();

  // Create a map of criterion number to criterion id
  const criterionMap = new Map<string, number>();
  for (const criterion of insertedCriteria) {
    criterionMap.set(criterion.number, criterion.id);
  }

  // Prepare tests with resolved criterion IDs
  const testsWithCriterionIds = tests.map((test) => ({
    criterionId: criterionMap.get(test.criterionNumber) ?? 0,
    description: test.description,
    number: test.number,
  }));

  // Insert tests
  console.log("🧪 Inserting tests...");
  await db.insert(rgaaTest).values(testsWithCriterionIds).onConflictDoNothing();

  console.log("✅ RGAA seeding complete!");
  console.log(`   - ${insertedThemes.length} themes`);
  console.log(`   - ${insertedCriteria.length} criteria`);
  console.log(`   - ${tests.length} tests`);
}

seedRgaa()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
