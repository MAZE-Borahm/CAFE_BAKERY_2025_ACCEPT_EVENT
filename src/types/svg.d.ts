import * as Icons from "@/assets/svg"

type KeyOfIcon = keyof typeof Icons

declare module "*.svg" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default value
}
