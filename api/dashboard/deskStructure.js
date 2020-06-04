import S from "@sanity/desk-tool/structure-builder";
import { MdDescription, MdList, MdStorage, MdSettings } from "react-icons/md";

// Utilities
import types from "./types";

/**
 * Create a document list item
 * @param  {string} documentType - Document type name
 * @param  {string} documentId   - Document id (defaults to type name)
 * @param  {Object} icon         - List item icon
 * @return {Object}              - List item
 */
const createDocumentListItem = (
  documentType,
  documentId = null,
  icon = null,
) => {
  // NOTE: Re-assinging parameters is acceptable here
  documentId = documentId || documentType;

  return S.documentListItem()
    .schemaType(documentType)
    .id(documentId)
    .icon(icon);
};

/**
 * Create a document collection list item
 * @param  {string} collectionType - Document collection type name
 * @param  {string} title          - List item title
 * @param  {Object} icon           - List item icon
 * @return {Object}                - List item
 */
const createDocumentCollectionListItem = (
  collectionType,
  title,
  icon = null,
) => {
  return S.listItem()
    .title(title)
    .schemaType(collectionType)
    .child(S.documentTypeList(collectionType).title(title))
    .icon(icon);
};

const pageListItems = types.pageTypes.map((p) =>
  createDocumentListItem(p, p, MdDescription),
);
const collectionListItems = types.collectionTypesExtended.map((c) =>
  createDocumentCollectionListItem(c.value, c.label, MdList),
);

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        // Show an editor when selected
        .child(S.editor().schemaType("siteSettings").documentId("siteSettings"))
        .icon(MdSettings),
      S.listItem()
        .title("Pages")
        .child(S.list().title("Pages").items(pageListItems))
        .icon(MdDescription),
      S.listItem()
        .title("Data")
        .child(S.list().title("Data").items(collectionListItems))
        .icon(MdStorage),
      // ...S.documentTypeListItems().filter(singletonDocTypes),
    ]);
