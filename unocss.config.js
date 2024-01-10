import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  rules: [
    // ['sans-serif', { 'font-family': '-apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;' }]
    // --font-sans: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif;

    ['line-clamp-5', {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-line-clamp': 5,
      '-webkit-box-orient': 'vertical'
    }],

    ['w-modal', {
      'width': '27rem'
    }],

    ['min-h-20', {
      'min-height': '20em'
    }]
  ],
  shortcuts: {

    'root': 'selector-[:root]:[--size-1: 0.25rem]'

/*
    '--size-1': .25rem,
    --size-2: .5rem,
    --size-3: 1rem,
    --size-4: 1.25rem,
    --size-5: 1.5rem,
    --size-6: 1.75rem,
    --size-7: 2rem,
    --size-8: 3rem,
    --size-9: 4rem,
    --size-10: 5rem,
    --size-11: 7.5rem,
    --size-12: 10rem,

    --gray-0: #f8f9fa,
    --gray-1: #f1f3f5,
    --gray-2: #e9ecef,
    --gray-3: #dee2e6,
    --gray-4: #ced4da,
    --gray-5: #adb5bd,
    --gray-6: #868e96,
    --gray-7: #495057,
    --gray-8: #343a40,
    --gray-9: #212529,
    --gray-10: #16191d,
    --gray-11: #0d0f12,
    --gray-12: #030507,

    --layer-1: 1,
    --layer-2: 2,
    --layer-3: 3,
    --layer-4: 4,
    --layer-5: 5,
    --layer-important: 2147483647,
    // color-scheme: dark;

    // --link: var(--indigo-3);
    // --text-1: var(--gray-1);
    // --text-2: var(--gray-4);
/* */
  },
  theme: {
    breakpoints: {
      'sm': '480px',  // min 480 (30em)
      'md': '480px',  // 480 - 960
      'lg': '960px',  // min 960 (60em)
    },
    colors: {
      // cv: 'rgb(var(--varname))',
      // 'dark-pink': '#d5008f'
    }
  },
  presets: [
    presetUno({ dark: 'media' }),
  ]
})
