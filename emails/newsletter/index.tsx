import { RichText, RichTextProps } from 'basehub/react-rich-text'
import {
  CodeBlock,
  CodeInline,
  dracula,
  Heading,
  Img,
  LinkProps,
  PrismLanguage,
  Tailwind,
  Text,
  TextProps,
  Link,
  Section,
  Head,
  Font
} from '@react-email/components'
import { fragmentOn } from 'basehub'

const socialLinkFragment = fragmentOn('SocialLinkComponent', {
  url: true,
  _title: true,
  image: {
    url: true
  }
})

type SocialLink = fragmentOn.infer<typeof socialLinkFragment>

type NewsletterEmailProps = {
  links: Array<{ href: string; label: string }>
  title: string
  description?: string
  content: RichTextProps['content']
  components: RichTextProps['components']
  blocks: RichTextProps['blocks']
  socialLinks?: SocialLink[] | null
  unsubscribeLink?: string | null
}

function NewsletterEmail({
  links,
  title,
  description,
  content,
  components,
  blocks,
  socialLinks,
  unsubscribeLink
}: NewsletterEmailProps) {
  return (
    <Tailwind>
      <Head>
        <Font
          fontFamily="Geist Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap',
            format: 'woff2'
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style>
          {`
          ul li p,
          ol li p {
             margin-bottom: 12px !important;
            }

          blackquote p {
            margin-block: 12px !important;
          }

          body {
            letter-spacing: -0.8px;
          }
         `}
        </style>
      </Head>
      <div className="max-w-screen-md mx-auto py-8 px-2 gap-8">
        <div className="flex">
          <Heading
            as="h1"
            className="font-[Geist_Mono] uppercase text-base underline decoration-dashed text-[#303030] mb-2 mt-0"
          >
            {title}
          </Heading>
          {!!links?.length && (
            <div className="uppercase ml-auto">
              {links.map((link) => {
                return (
                  <A key={link.href + link.label} href={link.href}>
                    {link.label}&nbsp;
                    <span className="mr-2">&rarr;</span>
                  </A>
                )
              })}
            </div>
          )}
        </div>
        {!!description && <P>{description}</P>}
        <RichText
          content={content}
          blocks={blocks}
          components={{ ...defaultComponents, ...components }}
        />
        <Hr />
        <div>
          {socialLinks && (
            <Section
              style={{
                textAlign: 'left',
                padding: 0,
                margin: 0,
                marginBottom: 16
              }}
            >
              {socialLinks
                ?.filter((item) => item.image)
                .map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="cursor-pointer"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#F0F0F3',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      marginRight: 16,
                      textDecoration: 'none',
                      lineHeight: 0 // Critical for email clients
                    }}
                  >
                    {/* Centering container */}
                    <div
                      style={{
                        display: 'table',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center'
                      }}
                    >
                      <div
                        style={{
                          display: 'table-cell',
                          verticalAlign: 'middle',
                          padding: 0,
                          margin: 0
                        }}
                      >
                        <Img
                          src={item.image?.url}
                          alt={item._title || 'Social icon'}
                          width={16}
                          height={16}
                          style={{
                            display: 'inline-block',
                            margin: '0 auto',
                            outline: 'none',
                            border: 'none',
                            lineHeight: 0
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </Section>
          )}
          {unsubscribeLink && (
            <Text className="text-xs text-[#909090] mb-4 font-sans tracking-normal leading-relaxed mt-0">
              <A href={unsubscribeLink} className="font-sans">
                Unsubscribe
              </A>{' '}
              from daily release emails.
            </Text>
          )}
        </div>
      </div>
    </Tailwind>
  )
}

NewsletterEmail.PreviewProps = {
  title: 'Day 1: MCP',
  description: 'Your content present anywhere.',
  links: [
    { label: 'GO TO CHANGELOG', href: 'https://basehub.ai/changelog/day-1-mcp' }
  ],
  content: [
    {
      type: 'image',
      attrs: {
        src: 'https://assets.basehub.com/14f2efe8/01267cc12f64d3997e29d25ef8b014e2/image',
        width: 3600,
        height: 2025,
        aspectRatio: '16/9'
      }
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Starting today, every BaseHub user gets access to a new '
        },
        {
          type: 'text',
          text: 'MCP',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://docs.anthropic.com/en/docs/mcp'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' token, enabling seamless integration with AI tools like '
        },
        {
          type: 'text',
          text: 'Cursor',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://docs.cursor.com/context/model-context-protocol'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' and '
        },
        {
          type: 'text',
          text: 'Claude',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://modelcontextprotocol.io/quickstart/user'
              }
            }
          ]
        },
        {
          type: 'text',
          text: '.'
        }
      ]
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
        id: 'how-does-it-work'
      },
      content: [
        {
          type: 'text',
          text: 'How does it work?'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We expose an MCP server packed with common BaseHub tools—many of which you may already use via '
        },
        {
          type: 'text',
          text: '@START',
          marks: [
            {
              type: 'code',
              attrs: {}
            }
          ]
        },
        {
          type: 'text',
          text: " in your dashboard. But what if you're deep into coding your project and want a smooth way to query and modify content? That’s where BaseHub’s MCP integration comes in."
        }
      ]
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: 'available-tools'
      },
      content: [
        {
          type: 'text',
          text: 'Available tools'
        }
      ]
    },
    {
      type: 'video',
      attrs: {
        src: 'https://assets.basehub.com/14f2efe8/5bbf78381c637943e2f77cd1b476ff9c/screen-recording-2025-04-21-at-1050131glylmhg.mp4',
        width: 4096,
        height: 2304,
        aspectRatio: '16/9'
      }
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'You can now give your AI agent access to:'
        }
      ]
    },
    {
      type: 'bulletList',
      attrs: {
        tight: false
      },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'query_content',
                  marks: [
                    {
                      type: 'code',
                      attrs: {}
                    }
                  ]
                },
                {
                  type: 'text',
                  text: ': Fetch content from your project'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'commit',
                  marks: [
                    {
                      type: 'code',
                      attrs: {}
                    }
                  ]
                },
                {
                  type: 'text',
                  text: ': Save changes with version control'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'create/update/delete_blocks',
                  marks: [
                    {
                      type: 'code',
                      attrs: {}
                    }
                  ]
                },
                {
                  type: 'text',
                  text: ': Modify your structure on the fly'
                }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'get_repo_structure',
                  marks: [
                    {
                      type: 'code',
                      attrs: {}
                    }
                  ]
                },
                {
                  type: 'text',
                  text: ': Understand your project’s layout'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'And more—giving the AI full context to make meaningful, accurate updates.'
        }
      ]
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
        id: 'open-source-collaboration'
      },
      content: [
        {
          type: 'text',
          text: 'Open source collaboration'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'None of this would have been possible without the new '
        },
        {
          type: 'text',
          text: 'xMCP',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://www.npmjs.com/package/xmcp?activeTab=readme'
              }
            }
          ]
        },
        {
          type: 'text',
          text: ' framework by our friends at '
        },
        {
          type: 'text',
          text: 'basement.studio',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://basement.studio'
              }
            }
          ]
        },
        {
          type: 'text',
          text: '. It makes working with Model Context Protocol easy, with intuitive tool and param typing.'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Our MCP implementation is open-source—'
        },
        {
          type: 'text',
          text: 'check it out on GitHub',
          marks: [
            {
              type: 'link',
              attrs: {
                targetId: null,
                type: 'link',
                target: '_new',
                href: 'https://github.com/basehub-ai/mcp'
              }
            }
          ]
        },
        {
          type: 'text',
          text: '!'
        }
      ]
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
        id: 'more-in-the-oven'
      },
      content: [
        {
          type: 'text',
          text: 'More in the oven!'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "We’re constantly shipping new features to make BaseHub even more powerful for developers and editors. Especially in the AI space—stay tuned, there's a lot more coming soon!"
        }
      ]
    }
  ],
  unsubscribeLink: 'https://basehub.ai/waitlist',
  socialLinks: [
    {
      image: {
        url: 'https://assets.basehub.com/14f2efe8/709a7ed964fa3da3d29d4dc86e1a91f7/linkedin.png'
      }
    },
    {
      image: {
        url: 'https://assets.basehub.com/14f2efe8/ba62e381c481c5eb17e960f5c7698a09/discor.png'
      }
    },
    {
      image: {
        url: 'https://assets.basehub.com/14f2efe8/e36ed2f9801cd9bc72c898533f28602e/x.png'
      }
    },
    {
      image: {
        url: 'https://assets.basehub.com/14f2efe8/4d2ceefdf0ba3071f16d871bae91761a/github.png'
      }
    }
  ]
}

const Hr = () => (
  <hr className="border-0 border-b border-solid border-[#E8E8EC] my-8" />
)

const A = (props: LinkProps) => {
  return <Link {...props} className="text-[#FF6C02] underline" />
}

const P = ({ children }: TextProps) => (
  <Text className="leading-relaxed font-[Geist_Mono] text-[#909090] text-base mb-5">
    {children}
  </Text>
)

const defaultComponents: RichTextProps['components'] = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      className="leading-none font-bold text-base font-mono mt-8 mb-4 text-[#303030]"
    >
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      className="leading-none font-bold font-mono text-base mt-8 mb-4 text-[#303030]"
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      className="leading-none font-bold font-mono text-base mt-8 mb-4 text-[#303030]"
    >
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading
      as="h4"
      className="leading-none font-bold font-mono mt-8 mb-4 text-[#303030]"
    >
      {children}
    </Heading>
  ),
  p: P,
  pre: ({ code, language }) => {
    return (
      <CodeBlock
        code={code}
        fontFamily="'CommitMono', monospace"
        language={language as PrismLanguage}
        theme={dracula}
      />
    )
  },
  code: ({ children }) => (
    <CodeInline className="font-semibold text-[#303030] text-sm">
      {children}
    </CodeInline>
  ),
  img: ({ src, alt, caption }) => (
    <figure className="mb-5 mx-0">
      <Img src={src} alt={alt} className="w-full object-cover mb-2 mx-0" />
      {caption && (
        <figcaption className="text-[#8B8D98] text-sm text-center mx-auto font-[Geist_Mono]">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
  b: (props) => <strong {...props} className="font-medium text-[#80838D]" />,
  blockquote: ({ ...props }) => (
    <blockquote
      {...props}
      className="border-0 pl-3 ml-0 border-l-4 border-solid border-[#E8E8EC] [&>b]:text-xs"
    />
  ),
  a: A,
  table: ({ children }) => <div className="overflow-x-auto">{children}</div>,
  thead: ({ children }) => (
    <thead className="text-left text-[#909090] font-medium text-xs uppercase">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 border-b border-[#E8E8EC]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-[#E8E8EC]">{children}</td>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-[#E8E8EC]">{children}</tr>
  ),
  li: ({ children }) => <li className="my-0">{children}</li>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  video: (props) => (
    <A href={props.src}>
      <figure className="mb-5 mx-0">
        <Img
          src="https://assets.basehub.com/14f2efe8/019663ca1841d12bd1a0ef9986aa53ab/video-thumb.jpg"
          alt="A black background with the words click to play video"
          className="w-full object-cover mb-2 mx-0"
        />
      </figure>
    </A>
  ),
  hr: Hr
}

export default NewsletterEmail
