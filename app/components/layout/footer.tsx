import { Pump } from 'basehub/react-pump'

export const Footer = async () => {
  return (
    <Pump queries={[{ footer: { copy: true, vector: true } }]}>
      {async ([{ footer }]) => {
        'use server'

        if (!footer.copy) return null

        return (
          <footer
            style={{
              fill: '#E5E5E5',
              opacity: 0.15
              // boxShadow:
              // '0px 4px 2px 0px #000 inset, 0px 4px 10px 0px rgba(0, 0, 0, 0.50) inset'
            }}
            className="mt-auto"
          >
            {/* <Icon content={footer.vector} /> */}
            {footer.vector && (
              <span
                dangerouslySetInnerHTML={{ __html: footer.vector }}
                className="lowercase text-dim translate-y-[33%] block"
              />
            )}
          </footer>
        )
      }}
    </Pump>
  )
}
