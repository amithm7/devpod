import { UseMutationResult } from "@tanstack/react-query"

export type TUnsubscribeFn = VoidFunction
export type TComparable<T> = Readonly<{ eq(b: T): boolean }>
export type TIdentifiable = Readonly<{ id: string }>
export type TStreamID = string
export type TDeepNonNullable<T> = {
  [K in keyof T]-?: T[K] extends object ? TDeepNonNullable<T[K]> : Required<NonNullable<T[K]>>
}

//#region Shared
export type TLogOutput = Readonly<{ time: Date; message?: string; level: string }>
export type TQueryResult<TData extends Readonly<object>> = [
  TData | undefined,
  Pick<UseMutationResult, "status" | "error">
]
export type TRunnable<TRunConfig> = Readonly<{ run(config: TRunConfig): void }>
//#endregion

//#region IDE
export type TIDEs = readonly TIDE[]
export type TIDE = Readonly<{
  name: string | null
  displayName: string
  default: boolean | null
  icon: string | null
}>
//#endregion

//#region Provider
export type TProviderID = string
export type TOptionID = string
export type TWithProviderID = Readonly<{ providerID: TProviderID }>
export type TProviders = Record<TProviderID, TProvider>
export type TProvider = Readonly<{
  config: TProviderConfig | null
  default: boolean | null
  state: Readonly<{
    initialized: boolean | null
    singleMachine: boolean | null
    creationTimestamp: string | null
    options: TProviderOptions | null
  }> | null
}>
export type TNamedProvider = TProvider & Readonly<{ name: string }>
export type TProviderConfig = Readonly<{
  name: string | null
  version: string | null
  source: TProviderSource | null
  description: string | null
  optionGroups: TProviderOptionGroup[]
  options: TProviderOptions
  icon: string | null
  home: string | null
  exec: Record<string, readonly string[]> | null
}>
export type TProviderOptionGroup = Readonly<{
  name: string | null
  options: string[] | null
  defaultVisible: boolean | null
}>
export type TProviderSource = Readonly<{
  internal: boolean | null
  github: string | null
  file: string | null
  url: string | null
  raw: string | null
}>
export type TProviderOptions = Record<string, TProviderOption>
export type TProviderOption = Readonly<{
  // Value is the options current value
  value: string | null
  // If value is a password
  password: boolean | null
  // A description of the option displayed to the user by a supporting tool.
  description: string | null
  // If required is true and the user doesn't supply a value, devpod will ask the user
  required: boolean | null
  // Allowed values for this option.
  enum: string[] | null
  // Suggestions are suggestions to show in the DevPod UI for this option
  suggestions: string[] | null
  // Hidden specifies if the option should be hidden
  hidden: boolean | null
  // Local means the variable is not resolved immediately and instead later when the workspace / machine was created.
  local: boolean | null
  // Default value if the user omits this option from their configuration.
  default: string | null
  // Command is the command to run to specify an option
  command: string | null
  // Type is the provider option type. Can be one of: string, duration, number or boolean. Defaults to string
  type: "string" | "duration" | "number" | "boolean" | null
}>

export type TAddProviderConfig = Readonly<{
  name?: TProviderConfig["name"]
}>
export type TConfigureProviderConfig = Readonly<{
  options: Record<string, unknown>
  useAsDefaultProvider: boolean
  reuseMachine: boolean
}>
export type TProviderManager = Readonly<{
  remove: TRunnable<TWithProviderID> &
    Pick<UseMutationResult, "status" | "error"> & { target: TWithProviderID | undefined }
}>
export type TCheckProviderUpdateResult = Readonly<{
  updateAvailable: boolean
  latestVersion?: string
}>
//#endregion

//#region Workspace
export type TWorkspaceID = NonNullable<TWorkspace["id"]>
export type TWithWorkspaceID = Readonly<{ workspaceID: TWorkspaceID }>
export type TWorkspace = Readonly<{
  id: string
  picture: string | null
  provider: Readonly<{ name: string | null }> | null
  status: "Running" | "Busy" | "Stopped" | "NotFound" | undefined | null
  ide: {
    name: string | null
  } | null
  creationTimestamp: string
  lastUsed: string
  source: {
    gitRepository: string | null
    gitBranch: string | null
    localFolder: string | null
    image: string | null
  } | null
}>
export type TWorkspaceWithoutStatus = Omit<TWorkspace, "status"> & Readonly<{ status: null }>
export type TWorkspaceStatusResult = Readonly<{
  id: string | null
  context: string | null
  provider: string | null
  state: TWorkspace["status"] | null
}>
export type TWorkspaceStartConfig = Readonly<{
  id: string
  prebuildRepositories?: string[]
  devcontainerPath?: string
  ideConfig?: TWorkspace["ide"]
  providerConfig?: Readonly<{ providerID?: TProviderID }>
  // Instead of starting a workspace just by ID, the sourceConfig starts it with a `source/ID` combination
  sourceConfig?: Readonly<{
    source: string
  }>
}>
export const SUPPORTED_IDES = ["vscode", "intellj"] as const
export type TSupportedIDE = (typeof SUPPORTED_IDES)[number]
//#endregion

export type TDevcontainerSetup = Readonly<{
  isGitRepository: boolean
  isLocal: boolean
  isImage: boolean
  configPaths: string[]
}>
//#region CommunityContributions
export type TCommunityContributions = Readonly<{
  providers: readonly TCommunityProvider[]
}>
export type TCommunityProvider = Readonly<{
  repository: string
}>
//#endregion

export function isWithWorkspaceID(arg: unknown): arg is TWithWorkspaceID {
  return typeof arg === "object" && arg !== null && "workspaceID" in arg
}
