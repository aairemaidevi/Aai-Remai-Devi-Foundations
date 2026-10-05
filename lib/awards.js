import { supabase, supabaseConfigError } from "@/lib/supabaseClient";

const AWARD_FOLDER = "AWARD";
const IMAGE_FILE = /\.(avif|gif|jpe?g|png|webp)$/i;

const AWARD_STORIES = {
  "chikali wadi.jpeg": {
    title: "Chikali Wadi",
    category: "A village milestone",
    summary: "A moment to celebrate the people and shared spirit of Chikali Wadi.",
    paragraphs: [
      "This recognition celebrates the community of Chikali Wadi and the people whose care, ideas and participation make local progress possible.",
      "Every meaningful milestone begins with people coming together. We are proud to share this moment as part of our ongoing journey with the communities we serve.",
    ],
  },
  "kansewwadi.jpeg": {
    slug: "kansewadi",
    title: "Kansewadi",
    category: "A village milestone",
    summary: "Celebrating the local commitment and community spirit of Kansewadi.",
    paragraphs: [
      "This moment shines a light on Kansewadi and the collective effort behind stronger, more connected communities.",
      "Lasting change grows from local voices and shared action. This image is a reminder that progress belongs to everyone who helps make it possible.",
    ],
  },
  "niwachi wadi.jpeg": {
    title: "Niwachi Wadi",
    category: "A village milestone",
    summary: "Recognising a community journey shaped by local voices and shared effort.",
    paragraphs: [
      "This recognition celebrates the people of Niwachi Wadi and the community spirit that helps turn a shared vision into meaningful progress.",
      "We are grateful to everyone who contributes their time, ideas and support to the development of their village.",
    ],
  },
  "photos of the brainstorming sessions we held in the village... kansewadi.jpeg": {
    title: "A vision shaped together",
    category: "Village brainstorming · Kansewadi",
    summary: "Community brainstorming sessions in Kansewadi, where local ideas help shape the way forward.",
    paragraphs: [
      "Strong community work starts by listening. These brainstorming sessions brought people together in Kansewadi to share ideas, discuss priorities and shape a vision for their village.",
      "When residents help lead the conversation, plans can reflect the hopes and needs of the community. The image captures that spirit of participation and working together.",
    ],
  },
};

function createSlug(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createTitle(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/\.\.\./g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getAwards() {
  if (!supabase) {
    return {
      awards: [],
      error: supabaseConfigError ?? "Supabase is not configured for this deployment.",
    };
  }

  const { data, error } = await supabase.storage
    .from("site-images")
    .list(AWARD_FOLDER, {
      limit: 100,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Could not load award images from Supabase Storage:", error);
    return { awards: [], error: "We could not load the awards right now. Please try again later." };
  }

  const awards = (data ?? [])
    .filter((file) => IMAGE_FILE.test(file.name))
    .map((file) => {
      const story = AWARD_STORIES[file.name.toLowerCase()];
      const imagePath = `${AWARD_FOLDER}/${file.name}`;
      const { data: publicImage } = supabase.storage
        .from("site-images")
        .getPublicUrl(imagePath);

      return {
        name: file.name,
        slug: story?.slug ?? createSlug(file.name),
        title: story?.title ?? createTitle(file.name),
        category: story?.category ?? "Award & recognition",
        summary: story?.summary ?? "A moment from the foundation's community journey.",
        paragraphs: story?.paragraphs ?? [
          "This image is part of the foundation's collection of awards and community milestones.",
          "Every milestone is made possible by the people who share their ideas, time and commitment with their community.",
        ],
        image: publicImage.publicUrl,
      };
    });

  return { awards, error: null };
}
