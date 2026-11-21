import type {FunctionalComponent} from "vue";

/**
 * Renders only its default slot, without a wrapper element and discarding all props/attributes.
 *
 * Intended as the "no wrapper" branch of dynamic `<component :is>` usage in templates, where
 *   Vue's `Fragment` cannot be used (template children compile to a slots object, which only a
 *   real component can render).
 *
 * NOTE: In `h()` render functions, use Vue's `Fragment` instead (it accepts array children directly).
 *
 * @example
 * <component :is="to ? RouterLink : MSlotPassthrough" :to="to">{{ label }}</component>
 */
const MSlotPassthrough: FunctionalComponent = (_props, {slots}) => slots.default?.();

// Discard attributes intended for the "real" wrapper component (ie. `:to` for `RouterLink`)
MSlotPassthrough.inheritAttrs = false;

export default MSlotPassthrough;
