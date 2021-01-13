<script lang="ts">
  import { text } from '../store';
  const log = console.log.bind(console)

  let isTextSelected = false

  let selectionStart
  let selectionEnd
  let highlightRectangle;

  const VALID_KEYS = ['Escape', 'KeyO', 'KeyP', 'KeyL', 'KeyM']

  function updateSelection(event){
    // https://developer.mozilla.org/en-US/docs/Web/API/Selection
    const selection = window.getSelection()

    isTextSelected = true

    // Focus can be before anchor (if we select backwards from cursor)
    const start = Math.min(selection.anchorOffset, selection.focusOffset)
    const end = Math.max(selection.anchorOffset, selection.focusOffset)
    selectionStart = start
    selectionEnd = end

    // https://stackoverflow.com/questions/5143534/how-to-get-the-position-of-text-within-an-element
    const parentElement = selection.anchorNode
    const range = document.createRange();
    range.setStart(parentElement, start);
    range.setEnd(parentElement, end);
    // These rects contain the client coordinates in top, left
    const rects = range.getClientRects();
    const firstRectangle = rects[0];

    highlightRectangle = firstRectangle
    log(`Selected \n"${selection}"\n from ${start} to ${end}`)
  }

  document.addEventListener('keyup', function(event){
    const keyCode = event.code
    if ( ! VALID_KEYS.includes(keyCode) ) {
      log(`Invalid key, ignoring`)
      return
    }

    log(`Key ${keyCode} was pressed`, keyCode)
  })

    

    // Get position of selection? 
    // Or style based on actual word?
    // window.getSelection().removeAllRanges();
  
  
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
  <article on:mouseup={updateSelection}>
  
    <p class="text">{text}</p>
  </article>
</section>
