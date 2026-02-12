# Добавление видео в локальную документацию

Если у вас нет публичного хостинга для видео, поместите файл `demo.mp4` в папку `docs/media/` и добавьте ссылку или встроите его в Markdown:

```html
<video controls width="640">
  <source src="./media/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

Файл-заглушка находится в `docs/media/README.txt` — замените его реальным `demo.mp4`.
