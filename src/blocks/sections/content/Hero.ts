import { Section } from '../base'

const Hero = Section({
  slug: 'Hero',
  data: [
    {
      name: 'header',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'orientation',
    //   type: 'select',
    //   options: ['Left to Right', 'Right to Left'],
    //   defaultValue: 'Left to Right',
    //   required: true,
    // },
    // {
    //   name: 'background',
    //   type: 'text',
    // },
  ],
})

export default Hero
