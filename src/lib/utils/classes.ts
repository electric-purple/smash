// TODO this is stupid; find a better way for classes

export const c = (...args: (string | boolean)[]) => {
	return args.filter(Boolean).join(' ')
}
