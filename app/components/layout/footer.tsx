import { Pump } from 'basehub/react-pump'

export const Footer = async () => {
  return (
    <Pump
      queries={[{ footer: { copy: true, vector: true, vectorDark: true } }]}
    >
      {async ([{ footer }]) => {
        'use server'

        if (!footer.copy) return null

        return (
          <footer
            style={{
              fill: '#E5E5E5'
              // opacity: 0.15
            }}
            className="mt-auto overflow-hidden"
          >
            {/* <Icon content={footer.vector} /> */}
            {footer.vector && (
              <span
                dangerouslySetInnerHTML={{ __html: footer.vector }}
                className="lowercase text-dim translate-y-[33%] block select-none w-[105vw] relative left-1/2 -translate-x-1/2"
              />
            )}
          </footer>
        )
      }}
    </Pump>
  )
}
