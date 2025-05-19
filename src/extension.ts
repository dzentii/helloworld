import * as vscode from 'vscode';
import MarkdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji'
import markdownItMermaid from 'markdown-it-mermaid';

export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: any) {
            try {
                // emoji поддержка
                md.use(emoji);

                // mermaid диаграммы
                md.use(markdownItMermaid);

                // Контейнер для alert
                md.use(markdownItContainer, 'alert', {
                    validate: (params: string) => {
                        return params.trim() === 'alert';
                    },
                    render: (tokens: any, idx: number) => {
                        if (tokens[idx].nesting === 1) {
                            return '<div class="alert">\n';
                        } else {
                            return '</div>\n';
                        }
                    }
                });

                // Контейнер для spoiler
                md.use(markdownItContainer, 'spoiler', {
                    marker: '?',
                    validate: (params: string) => {
                        return params.trim().startsWith('spoiler');
                    },
                    render: (tokens: any, idx: number) => {
                        const token = tokens[idx];
                        const titleMatch = token.info.match(/spoiler\s+"(.*)"/);
                        const title = titleMatch ? titleMatch[1] : 'Спойлер';

                        if (token.nesting === 1) {
                            return `<div class="spoiler"><details><summary>${title}</summary>\n`;
                        } else {
                            return '</details></div>\n';
                        }
                    }
                });

                console.log('Markdown-it plugins loaded successfully');
                return md;
            } catch (error) {
                console.error('Error loading markdown-it plugins:', error);
                return md;
            }
        }
    };
}