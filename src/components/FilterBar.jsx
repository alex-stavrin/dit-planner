import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { allCategories, allSemesters } from '@/data/coursesData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function FilterBar({ categories, setCategories, semesters, setSemesters, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [allSemestersSelected, setAllSemestersSelected] = useState(
    semesters.length === allSemesters.length
  );
  const [allCategoriesSelected, setAllCategoriesSelected] = useState(
    categories.length === allCategories.length
  );

  const initialSemesters = semesters;
  const initialCategories = categories;

  const [selectedSemesters, setSelectedSemesters] = useState(initialSemesters);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);

  // Reset selections when the sheet is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedSemesters([...semesters]);
      setSelectedCategories([...categories]);
      setAllSemestersSelected(semesters.length === allSemesters.length);
      setAllCategoriesSelected(categories.length === allCategories.length);
    }
  }, [isOpen, categories, semesters]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectAllSemestersClick = () => {
    if (!allSemestersSelected) {
      setSelectedSemesters(allSemesters);
    } else {
      setSelectedSemesters([]);
    }
    setAllSemestersSelected(!allSemestersSelected);
  };

  const handleSelectAllCategoriesClick = () => {
    if (!allCategoriesSelected) {
      setSelectedCategories(allCategories);
    } else {
      setSelectedCategories([]);
    }
    setAllCategoriesSelected(!allCategoriesSelected);
  };

  const handleCancel = () => {
    setSelectedCategories(initialCategories);
    setSelectedSemesters(initialSemesters);
    handleClose();
  };

  const handleApply = () => {
    setCategories(selectedCategories);
    setSemesters(selectedSemesters);
    handleClose();
  };

  const getNumberOfFiltersApplied = () => {
    let numberOfFiltersApplied = 0;
    if (!allCategoriesSelected) numberOfFiltersApplied++;
    if (!allSemestersSelected) numberOfFiltersApplied++;
    return numberOfFiltersApplied;
  };

  // Helper to toggle semester selection
  const toggleSemester = (semester) => {
    if (selectedSemesters.some((s) => s.value === semester.value)) {
      setSelectedSemesters(selectedSemesters.filter((s) => s.value !== semester.value));
      setAllSemestersSelected(false);
    } else {
      const newSelected = [...selectedSemesters, semester];
      setSelectedSemesters(newSelected);
      setAllSemestersSelected(newSelected.length === allSemesters.length);
    }
  };

  // Helper to toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.some((c) => c.value === category.value)) {
      setSelectedCategories(selectedCategories.filter((c) => c.value !== category.value));
      setAllCategoriesSelected(false);
    } else {
      const newSelected = [...selectedCategories, category];
      setSelectedCategories(newSelected);
      setAllCategoriesSelected(newSelected.length === allCategories.length);
    }
  };

  // Helper to check if item is selected
  const isSemesterSelected = (value) => {
    return selectedSemesters.some((item) => item.value === value);
  };

  const isCategorySelected = (value) => {
    return selectedCategories.some((item) => item.value === value);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="default"
            className="relative rounded-md bg-blue-500 hover:bg-blue-600"
            onClick={handleOpen}
          >
            Filters
            {getNumberOfFiltersApplied() > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-xs">
                {getNumberOfFiltersApplied()}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex h-full flex-col overflow-hidden p-0 sm:max-w-md">
          <SheetHeader className="px-4 pt-4">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          {/* Use ScrollArea component for smooth scrolling */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-6 py-6">
              {/* Semesters Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">By Semester:</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-semesters"
                      checked={allSemestersSelected}
                      onCheckedChange={handleSelectAllSemestersClick}
                    />
                    <label
                      htmlFor="select-all-semesters"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Select All
                    </label>
                  </div>
                </div>

                <div className="rounded-md border p-2">
                  <div className="max-h-none overflow-y-auto">
                    {allSemesters.map((semester) => (
                      <div
                        key={semester.value}
                        onClick={() => toggleSemester(semester)}
                        className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer"
                      >
                        <div
                          className={cn(
                            'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSemesterSelected(semester.value)
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50'
                          )}
                        >
                          {isSemesterSelected(semester.value) && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm">{semester.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {selectedSemesters.map((semester) => (
                    <Badge key={semester.value} variant="secondary" className="gap-1">
                      {semester.label}
                      <button
                        className="ml-1 rounded-full outline-none focus:outline-none"
                        onClick={() => toggleSemester(semester)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Categories Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">By Category:</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-categories"
                      checked={allCategoriesSelected}
                      onCheckedChange={handleSelectAllCategoriesClick}
                    />
                    <label
                      htmlFor="select-all-categories"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Select All
                    </label>
                  </div>
                </div>

                <div className="rounded-md border p-2">
                  <div className="max-h-none overflow-y-auto">
                    {allCategories.map((category) => (
                      <div
                        key={category.value}
                        onClick={() => toggleCategory(category)}
                        className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer"
                      >
                        <div
                          className={cn(
                            'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isCategorySelected(category.value)
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50'
                          )}
                        >
                          {isCategorySelected(category.value) && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm">{category.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((category) => (
                    <Badge key={category.value} variant="secondary" className="gap-1">
                      {category.label}
                      <button
                        className="ml-1 rounded-full outline-none focus:outline-none"
                        onClick={() => toggleCategory(category)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sort by Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sort courses:</h3>
                <Select onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a sort option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sort options</SelectLabel>
                      <SelectItem value="ECTS_in">By ECTS (increasing)</SelectItem>
                      <SelectItem value="ECTS_de">By ECTS (decreasing)</SelectItem>
                      <SelectItem value="ALPHA">By alphabetical order</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Add some bottom padding to ensure content isn't cut off */}
              <div className="h-4"></div>
            </div>
          </ScrollArea>

          <SheetFooter className="mt-auto border-t px-4 py-4">
            <Button variant="outline" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
