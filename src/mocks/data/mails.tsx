export interface MailProtocol {
	id: number;
	title: string;
	description: string;
	rawDescription: string;
	isNew: boolean;
	isArchived: boolean;
}

export const DEFAULT_MAILS: MailProtocol[] = [{
	id: 1,
	title: 'Mail - 1',
	description: 'This is description of first mail for test purpose. This is to verify that in case of excess height, ellipsis should be displayed.',
	rawDescription: '# This is test for the head↵↵**Bold**↵↵- Test↵↵![](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)',
	isNew: true,
	isArchived: false,
},{
	id: 2,
	title: 'Archived Mail - 1',
	description: 'This is description of first mail for test purpose',
	rawDescription: 'This is description of first mail for test purpose',
	isNew: false,
	isArchived: true,
},{
	id: 3,
	title: 'Mail - 2',
	description: 'This is description of first mail for test purpose',
	rawDescription: 'This is description of first mail for test purpose',
	isNew: false,
	isArchived: false,
}]