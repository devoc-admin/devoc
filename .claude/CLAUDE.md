- Always use types instead of interfaces.

## Motion Animation Components

Create custom React motion animation wrapper components for reusable animations. These components should:

- Be defined below the main component page (at the end of the file)
- Wrap children content with minimal tailwind classnames on the motion.div itself
- Focus on animation-specific props (variants, initial, animate, exit, transition, etc.)
- Use an intermediate container div inside the motion wrapper to organize layout and styling of children
- Enable clean usage like <FadeAndMove><div>content</div></FadeAndMove> instead of <motion.div> scattered throughout the page

Example pattern:
- In your page component, use: <FadeInUp><h1>My Heading</h1></FadeInUp>
- At the end of the file, define the animation component with motion.div wrapping an intermediate div for children
- Animation props go on motion.div (initial, animate, exit, transition)
- Layout/styling classnames go on the intermediate container div, not on motion.div
