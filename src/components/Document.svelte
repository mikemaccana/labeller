<script lang="ts">
  import { text, annotations } from '../store';
  const log = console.log.bind(console)

  var textWithAnnotations = text

  function getSelection(event){
    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    const selection = window.getSelection()

    // Focus can be before anchor (if we select backwards from cursor)
    const start = Math.min(selection.anchorOffset, selection.focusOffset)
    const end = Math.max(selection.anchorOffset, selection.focusOffset)
    log(`Selected \n"${selection}"\n from ${start} to ${end}`)

    // https://stackoverflow.com/questions/5143534/how-to-get-the-position-of-text-within-an-element
    const parentElement = selection.anchorNode
    const range = document.createRange();
    range.setStart(parentElement, start);
    range.setEnd(parentElement, end);
    // These rects contain the client coordinates in top, left
    const rects = range.getClientRects();
    const firstRectangle = rects[0]

    const { top, bottom, left, right } = { firstRectangle }

    

    // Get position of selection? 
    // Or style based on actual word?
    // window.getSelection().removeAllRanges();
  }
  
</script>

<style>
  article {
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
  }

  p.text {
    /* Stolen from medium.com */
    color: rgba(41, 41, 41, 1);
    word-break: break-word;
    margin-bottom: -0.46em;
    letter-spacing: -0.003em;
    font-size: 21px;
    margin-top: 2em;
    line-height: 32px;
  }
  
</style>

<section class="instructions-and-document">
  <p>Use the mouse to select text to annotate, and press one of these keys to label it</p>
  <article on:mouseup={updateSelection} on:keyup={annotateCurrentSelection}>
  
    <p class="text">{text}</p>
  </article>
</section>
