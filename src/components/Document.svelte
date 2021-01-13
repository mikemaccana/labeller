<script lang="ts">
  import { document, annotations } from '../store';
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

<article>
  <p>{document}</p>
</article>