import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function Settings({ onResetData, onSyncData, onImportData, onExportData, version }) {
  const resetButtonClicked = () => {
    onResetData();
  };

  const syncButtonClicked = () => {
    onSyncData();
  };

  const importButtonClicked = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImportData(file);
    }
  };

  const exportButtonClicked = () => {
    onExportData();
  };

  return (
    <div className="mt-5 flex h-full w-full flex-col items-center">
      <div className="w-full sm:w-3/4 md:w-1/3">
        <Card className="w-full">
          <CardHeader>
            <h3 className="text-xl font-bold">Settings</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 divide-y">
              <div className="pb-4">
                <Button
                  variant="outline"
                  className="bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={syncButtonClicked}
                >
                  Sync Data
                </Button>
              </div>

              <div className="pb-4 pt-4">
                <Input
                  type="file"
                  accept=".json"
                  onChange={importButtonClicked}
                  className="hidden"
                  id="importInput"
                />
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => document.getElementById('importInput').click()}
                  >
                    Import from file
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={exportButtonClicked}
                  >
                    Export to file
                  </Button>
                </div>
              </div>

              <div className="pb-4 pt-4">
                <Button variant="destructive" onClick={resetButtonClicked}>
                  Reset Data
                </Button>
              </div>

              <div className="pb-4 pt-4">
                Made by{' '}
                <a
                  href="https://www.alexstavrin.com/"
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alex Stavrin
                </a>
              </div>

              <div className="pb-4 pt-4">
                <h4 className="text-lg font-bold">Contributors</h4>
                <ul className="mt-2 list-disc pl-6">
                  <li>
                    <a
                      href="https://github.com/matinanadali"
                      className="text-blue-500 hover:text-blue-700 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      matinanadali
                    </a>
                  </li>
                  <li>DanielPikilidis</li>
                  <li>vaghred</li>
                </ul>
                <p className="mt-5">
                  Contribute in{' '}
                  <a
                    href="https://github.com/Alekossta/dit-planner"
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </p>
              </div>

              <div className="pt-4">Version: {version}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
