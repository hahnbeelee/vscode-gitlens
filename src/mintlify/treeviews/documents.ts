/* eslint-disable no-restricted-imports */
import * as path from 'path';
import axios from 'axios';
import * as vscode from 'vscode';
import { Doc } from '../components/viewProvider';
import { API_ENDPOINT } from '../utils/api';
import GlobalState from '../utils/globalState';

type Group = {
  _id: string;
  name: string;
  count: number;
  lastUpdatedDoc: Doc;
  tasksCount: number;
  isLoading: boolean;
};

export class DocumentsTreeProvider implements vscode.TreeDataProvider<GroupOption> {
  private state: GlobalState;
  private _onDidChangeTreeData: vscode.EventEmitter<GroupOption | undefined | null | void> = new vscode.EventEmitter<GroupOption | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<GroupOption | undefined | null | void> = this._onDidChangeTreeData.event;

  constructor(state: GlobalState) {
    this.state = state;
  }

  getTreeItem(element: GroupOption): vscode.TreeItem {
    return element;
  }

  async getChildren(groupElement: GroupOption): Promise<any[]> {
    if (groupElement) {
      const { data: { docs } } = await axios.get(`${API_ENDPOINT}/docs/method/${groupElement.group._id}`, {
        params: this.state.getAuthParams()
      });
      return docs.map((doc: any) => new DocOption(doc, vscode.TreeItemCollapsibleState.None));
    }

    try {
      const { data: { groups } } = await axios.get(`${API_ENDPOINT}/docs/groups`, {
        params: this.state.getAuthParams()
      });

      if (groups.length === 0) {
        return [new NoDocsOption()];
      }

      // Add docs to home level when just 1 group
      if (groups.length === 1) {
        const group = groups[0];
        const { data: { docs } } = await axios.get(`${API_ENDPOINT}/docs/method/${group._id}`, {
          params: this.state.getAuthParams()
        });
        if (docs.length === 0) {
          return [new NoDocsOption()];
        }
        return docs.map((doc: any) => new DocOption(doc, vscode.TreeItemCollapsibleState.None));
      }

      return [...groups.map((group: any) => new GroupOption(group, vscode.TreeItemCollapsibleState.Collapsed))];
    } catch {
      return [new ErrorOption()];
    }
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class GroupOption extends vscode.TreeItem {
  constructor(
    public readonly group: Group,
    public override readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(group.name, collapsibleState);
    this.tooltip = this.group.name;
    this.description = `${this.group.count} documents`;
    this.iconPath = getIconPathForGroup(group._id);
  }
}

class DocOption extends vscode.TreeItem {
  constructor(
    public readonly doc: Doc,
    public override readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(doc.title, collapsibleState);
    this.tooltip = this.doc.title;
    this.iconPath = {
      light: path.join(__filename, '..', '..', 'assets', 'icons', 'document.svg'),
      dark: path.join(__filename, '..', '..', 'assets', 'icons', 'document-dark.svg'),
    };
    this.contextValue = 'document';

    const onClickCommand: vscode.Command = {
      title: 'Prefill Doc',
      command: 'mintlify.prefill-doc',
      arguments: [this.doc]
    };

    this.command = onClickCommand;
  }
}

class NoDocsOption extends vscode.TreeItem {
  constructor() {
    super('', vscode.TreeItemCollapsibleState.None);
    this.description = 'No documents connected';
  }
}

class ErrorOption extends vscode.TreeItem {
  constructor() {
    super('', vscode.TreeItemCollapsibleState.None);
    this.description = 'Error loading documents';
  }
}

// TBD: Add doc option
export class AddDocOption extends vscode.TreeItem {
  constructor() {
    super('', vscode.TreeItemCollapsibleState.Collapsed);
    this.tooltip = '';
    this.description = 'Add new document';
  }
}

const getIconPathForGroup = (id: string): string | { light: string, dark: string } => {
  switch (id) {
    case 'github':
      return {
        light: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'github.svg'),
        dark: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'github-dark.svg')
      };
    case 'notion-private':
      return {
        light: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'notion.svg'),
        dark: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'notion-dark.svg'),
      };
    case 'googledocs-private':
      return {
        light: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'google-docs.svg'),
        dark: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'google-docs.svg'),
      };
    case 'confluence-private':
      return {
        light: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'confluence.svg'),
        dark: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'confluence.svg'),
      };
    case 'web':
      return {
        light: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'web.svg'),
        dark: path.join(__filename, '..', '..', 'assets', 'icons', 'logos', 'web-dark.svg'),
      };
    default:
      return '';
  }
};
