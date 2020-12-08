export class LoadingCache<T> {
  // initialize to empty
  private cache: Record<string, Promise<T>> = {}

  constructor(private loader: (key: string) => Promise<T>) {
    this.loader = loader
  }

  public get(key: string): Promise<T> {
    // use cache if exist
    if (this.cache[key]) {
      return this.cache[key]
    }

    // if cache does not exist, put value into cache and return
    const promise = this.loader(key)
    this.cache[key] = promise
    return promise
  }
}
