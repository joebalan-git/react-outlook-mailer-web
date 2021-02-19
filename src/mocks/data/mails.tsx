export interface MailProtocol {
	title: string;
	description?: string;
	isNew: boolean;
	isArchived: boolean;
}

export const DEFAULT_MAILS: MailProtocol[] = [{
	title: 'Mail - 1',
	description: 'This is description of first mail for test purpose',
	isNew: true,
	isArchived: false,
}]