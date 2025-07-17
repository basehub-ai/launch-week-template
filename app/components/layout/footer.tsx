import { Icon } from 'basehub/react-icon'
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
            {footer.vector && (
              <Icon
                content={footer.vector}
                components={{
                  svg: (props) => (
                    <svg
                      {...props}
                      className="lowercase light-only text-dim translate-y-[24%] xl:translate-y-1/3 cursor-default block select-none w-[105vw] relative left-1/2 -translate-x-1/2 font-mono"
                    />
                  )
                }}
              />
            )}
            {footer.vectorDark && (
              <Icon
                content={footer.vectorDark}
                components={{
                  svg: (props) => (
                    <svg
                      {...props}
                      className="lowercase dark-only text-dim translate-y-[24%] xl:translate-y-1/3 cursor-default block select-none w-[105vw] relative left-1/2 -translate-x-1/2 font-mono"
                    />
                  )
                }}
              />
            )}
          </footer>
        )
      }}
    </Pump>
  )
}
