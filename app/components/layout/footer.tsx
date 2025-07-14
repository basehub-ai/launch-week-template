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
          <footer className="mt-auto w-full overflow-clip">
            {/* <Icon content={footer.vector} /> */}
            {footer.vector && (
              <span
                dangerouslySetInnerHTML={{ __html: footer.vector }}
                className="lowercase light-only text-dim translate-y-[24%] xl:translate-y-1/3 cursor-default block select-none w-[105vw] relative left-1/2 -translate-x-1/2 font-mono"
              />
            )}
            {footer.vectorDark && (
              <span
                dangerouslySetInnerHTML={{ __html: footer.vectorDark }}
                className="lowercase dark-only text-dim translate-y-[24%] xl:translate-y-1/3 cursor-default block select-none w-[105vw] relative left-1/2 -translate-x-1/2 font-mono"
              />
            )}
          </footer>
        )
      }}
    </Pump>
  )
}
