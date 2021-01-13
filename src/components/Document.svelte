<script lang="ts">
  import { text, annotations } from '../store';
  const log = console.log.bind(console)

  function getSelection(event){
    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    const selection = window.getSelection()
    const start = selection.anchorOffset
    const end = selection.focusOffset
    log(`Selected \n"${selection}"\n from ${start} to ${end}`)
  }
  
</script>

<style>
  article {
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  }

  p {
    color: rgba(41, 41, 41, 1);
    word-break: break-word;
    margin-bottom: -0.46em;
    letter-spacing: -0.003em;
    font-size: 21px;
    margin-top: 2em;
    line-height: 32px;
  }
  
</style>

<article on:mouseup={getSelection}>
  <p>{text}</p>
</article>