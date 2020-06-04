import defaultResolve, {
  CreateAction,
  DeleteAction,
} from "part:@sanity/base/document-actions";

// Utilities
import types from "./types";

export default function resolveDocumentActions(props) {
  // Singleton types cannot be created/removed
  if (types.singletonTypes.includes(props.type)) {
    return defaultResolve(props).filter(
      (Action) => !(Action == DeleteAction || Action == CreateAction),
    );
  }

  return defaultResolve(props);
}
