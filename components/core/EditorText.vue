<script setup>
import Quill from "quill";
const props = defineProps({
  textEdit: {
    type: Object,
    default: {},
  },
});
const emit = defineEmits(["update:edit"]);
const editor = ref(null);
const contentHTML = ref("");
const contentDelta = ref(null);
onMounted(() => {
  const quill = new Quill(editor.value, {
    theme: "snow",
    placeholder: "Start typing...",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["link", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  });
  quill.setContents(props.textEdit);
  contentHTML.value = quill.root.innerHTML;
  quill.on("text-change", () => {
    contentHTML.value = quill.root.innerHTML;
    contentDelta.value = quill.getContents();
    props.textEdit = contentDelta.value;
    emit("update:edit", contentDelta.value);
  });
});
</script>

<template>
  <div>
    <div class="QuEditorText" ref="editor"></div>
  </div>
</template>
<style lang="scss">
.QuEditorText {
  @import "@/assets/scss/editorText.scss";
}
</style>
