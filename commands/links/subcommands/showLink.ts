import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, ComponentType } from "discord.js";
import { Link } from "../../../schemas/link";
import type { CommandExecute } from "../../clientCommand";

enum ButtonCustomID {
  PreviousPage = "previous-page",
  NextPage = "next-page",
}

const displayButtonCustomID = (customID: ButtonCustomID): string => {
  return customID
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const showLink: CommandExecute = async (interaction) => {
  const guildId = interaction.guildId!;
  const userId = interaction.user.id!;

  const message = new EmbedBuilder();

  const pageNumber = interaction.options.getInteger("page");
  const isPageNumberGiven = pageNumber !== null;

  const limitPerPage = 11;
  let currentPageStart = 0;
  let currentPageEnd = limitPerPage;

  const guildLinks = await Link.find({ guildId });
  const totalPages = Math.ceil(guildLinks.length / limitPerPage);
  const isInvalidPage = pageNumber && pageNumber > totalPages;

  if (isInvalidPage) {
    message.setDescription("Invalid page number!");

    await interaction.reply({
      embeds: [message],
      ephemeral: true,
    });

    return;
  } else if (isPageNumberGiven) {
    currentPageStart = pageNumber * limitPerPage - limitPerPage;
    currentPageEnd = currentPageStart + limitPerPage;
  }

  message
    .setTitle("Links")
    .addFields(getPageLinks(currentPageStart, currentPageEnd, guildLinks));

  const previousPageButton = new ButtonBuilder()
    .setCustomId(ButtonCustomID.PreviousPage)
    .setLabel(displayButtonCustomID(ButtonCustomID.PreviousPage))
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  const nextPageButton = new ButtonBuilder()
    .setCustomId(ButtonCustomID.NextPage)
    .setLabel(displayButtonCustomID(ButtonCustomID.NextPage))
    .setStyle(ButtonStyle.Primary);

  const embedButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    previousPageButton,
    nextPageButton,
  );

  setNextButtonDisabled(nextPageButton, currentPageEnd, guildLinks);

  const response = await interaction.reply({
    embeds: [message],
    components: [embedButtons],
  });

  const collectorFilter = (interaction: ButtonInteraction) =>
    interaction.user.id === userId; // only the user who triggered the original interaction can use the buttons

  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.Button,
    filter: collectorFilter,
  });

  collector.on("collect", async (_interaction) => {
    const customId = _interaction.customId as ButtonCustomID;

    if (customId === ButtonCustomID.NextPage) {
      currentPageStart += limitPerPage;
      currentPageEnd += limitPerPage;
    } else {
      currentPageStart -= limitPerPage;
      currentPageEnd -= limitPerPage;
    }

    message.setFields(
      getPageLinks(currentPageStart, currentPageEnd, guildLinks),
    );

    setPreviousButtonDisabled(previousPageButton, currentPageStart);
    setNextButtonDisabled(nextPageButton, currentPageEnd, guildLinks);

    await _interaction.update({
      embeds: [message],
      components: [embedButtons],
    });
  });
};

const getPageLinks = (pageStart: number, pageEnd: number, links: any[]) => {
  const pageLinks = links.slice(pageStart, pageEnd);

  return pageLinks.map(({ name, url }) => ({
    name: `${name} ⇩`,
    value: url,
  }));
};

const getIsNextButtonDisabled = (pageEnd: number, links: any[]) => {
  return pageEnd >= links.length;
};

const setNextButtonDisabled = (
  button: ButtonBuilder,
  pageEnd: number,
  links: any[],
) => {
  button.setDisabled(getIsNextButtonDisabled(pageEnd, links));
};

const getIsPreviousButtonDisabled = (pageStart: number) => {
  return pageStart === 0;
};

const setPreviousButtonDisabled = (
  button: ButtonBuilder,
  pageStart: number,
) => {
  button.setDisabled(getIsPreviousButtonDisabled(pageStart));
};