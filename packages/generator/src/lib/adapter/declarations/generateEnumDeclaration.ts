import type { DMMF } from '@prisma/generator-helper'
import { upperFirst } from 'lodash'
import { getDbName } from '~/lib/prisma-helpers/getDbName'
import { getEnumVarName } from '../../prisma-helpers/enums'
import type { Adapter } from '../types'

export function generateEnumDeclaration(
	adapter: Adapter,
	prismaEnum: DMMF.DatamodelEnum
) {
	const varName = getEnumVarName(prismaEnum)

	const enumFuncCall = adapter.getDeclarationFunc.enum(
		getDbName(prismaEnum),
		prismaEnum.values.map(getDbName)
	)

	let code = ''
	if (enumFuncCall.type) {
		code += `export type ${upperFirst(varName)} = ${enumFuncCall.type};`
	}

	if (enumFuncCall.func) {
		code += `export const ${varName} = ${enumFuncCall.func};`
	}

	return {
		imports: enumFuncCall.imports,
		code,
	}
}
