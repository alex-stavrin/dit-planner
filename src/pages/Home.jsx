import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { CircularProgress, CircularProgressLabel } from '@/components/ui/circular-progress';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Home({courses})
{
    const [ectsPassedSum, setEctsPassedSum] = useState(0);
    const [ectsPlannedSum, setEctsPlannedSum] = useState(0);

    const [currentGrade, setCurrentGrade] = useState(0);

    const [gpPassed, setGpPassed] = useState(0);
    const [gpPlanned, setGpPlanned] = useState(0);

    const [ypPassed, setYpPassed] = useState(0);
    const [ypPlanned, setYpPlanned] = useState(0);

    const [currentCount, setCurrentCount] = useState(0);
    const [passedCount, setPassedCount] = useState(0);
    const [plannedCount, setPlannedCount] = useState(0);
    
    //
    // Could be done with array and more efficiently. Just doing this for now
    //

    const [s1BPassed, setS1BPassed] = useState(0);
    const [s1BPlanned, setS1BPlanned] = useState(0);
    const [s1YPassed, setS1YPassed] = useState(0);
    const [s1YPlanned, setS1YPlanned] = useState(0);

    const [s2BPassed, setS2BPassed] = useState(0);
    const [s2BPlanned, setS2BPlanned] = useState(0);
    const [s2YPassed, setS2YPassed] = useState(0);
    const [s2YPlanned, setS2YPlanned] = useState(0);

    const [s3BPassed, setS3BPassed] = useState(0);
    const [s3BPlanned, setS3BPlanned] = useState(0);
    const [s3YPassed, setS3YPassed] = useState(0);
    const [s3YPlanned, setS3YPlanned] = useState(0);

    const [s4BPassed, setS4BPassed] = useState(0);
    const [s4BPlanned, setS4BPlanned] = useState(0);
    const [s4YPassed, setS4YPassed] = useState(0);
    const [s4YPlanned, setS4YPlanned] = useState(0);

    const [s5BPassed, setS5BPassed] = useState(0);
    const [s5BPlanned, setS5BPlanned] = useState(0);
    const [s5YPassed, setS5YPassed] = useState(0);
    const [s5YPlanned, setS5YPlanned] = useState(0);

    const [s6BPassed, setS6BPassed] = useState(0);
    const [s6BPlanned, setS6BPlanned] = useState(0);
    const [s6YPassed, setS6YPassed] = useState(0);
    const [s6YPlanned, setS6YPlanned] = useState(0);

    useEffect(()=>{
        calculateStats();
    },[courses]);

    const calculateStats = () =>
    {
        // Existing calculation code remains the same
        let passedCount = 0;
        let passedEcts = 0;
        let plannedEcts = 0;
        let weightedSum = 0;
        let currentCountSum = 0;
        let gpPassedSum = 0;
        let gpPlannedSum = 0;
        let ypPassedSum = 0;
        let ypPlannedSum = 0;
        let s1BPassedSum=0;
        let s1BPlannedSum=0;
        let s1YPassedSum=0;
        let s1YPlannedSum=0;
    
        let s2BPassedSum=0;
        let s2BPlannedSum=0;
        let s2YPassedSum=0;
        let s2YPlannedSum=0;
    
        let s3BPassedSum=0;
        let s3BPlannedSum=0;
        let s3YPassedSum=0;
        let s3YPlannedSum=0;
    
        let s4BPassedSum=0;
        let s4BPlannedSum=0;
        let s4YPassedSum=0;
        let s4YPlannedSum=0;
    
        let s5BPassedSum=0;
        let s5BPlannedSum=0;
        let s5YPassedSum=0;
        let s5YPlannedSum=0;
    
        let s6BPassedSum=0;
        let s6BPlannedSum=0;
        let s6YPassedSum=0;
        let s6YPlannedSum=0;

        courses.forEach(course => {
            // All the existing calculation code stays the same
            // passed course
            if(course.grade>=5)
            {
                setPassedCount((prev) => prev+1);

                passedCount++;
                passedEcts+=parseInt(course.ECTS);
                weightedSum += parseInt(course.ECTS) * course.grade;

                if(course.category==="ΓΠ")
                {
                    gpPassedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPassedSum++;
                }

                if(course.s1)
                {
                    if(course.s1==="Υ")
                    {
                        s1YPassedSum++;
                    }

                    if(course.s1==="B")
                    {
                        s1BPassedSum++;
                    }
                }

                // ... rest of your calculation code
            }
            // planned course
            if(course.hasCourse)
            {
                setPlannedCount((prev) => prev+1);

                plannedEcts+=parseInt(course.ECTS);

                if(course.category==="ΓΠ")
                {
                    gpPlannedSum++;
                }

                if(course.category==="ΥΜ")
                {
                    ypPlannedSum++;
                }

                // ... rest of your calculation code
            }
            if(course.isActive)
            {
                currentCountSum++;
                setCurrentCount((prev) => prev+1);
            }
        });
        // ... all your setState calls stay the same
        setEctsPassedSum(passedEcts);
        setEctsPlannedSum(plannedEcts);
        setGpPassed(gpPassedSum);
        setGpPlanned(gpPlannedSum);
        setYpPassed(ypPassedSum);
        setYpPlanned(ypPlannedSum);

        // ... rest of your setState calls

        if(passedEcts !== 0)
        {
            setCurrentGrade(weightedSum / passedEcts);
        }
    }
    
    return (
        <div className="flex items-center justify-center flex-col overflow-auto">
            <CircularProgress 
                value={ectsPassedSum} 
                min={0} 
                max={240} 
                size='250px' 
                thickness='5px' 
                className="mt-3 text-blue-500"
            >
                <CircularProgressLabel className="text-2xl">
                    {ectsPassedSum} ects
                </CircularProgressLabel>
            </CircularProgress>
            
            <div className="flex flex-col w-full sm:w-3/4 md:w-1/2 mb-4">
                <Button 
                    asChild 
                    className="h-[65px] rounded-none mb-1 bg-blue-500 hover:bg-blue-600"
                >
                    <RouterLink to="/dit-planner/all">
                        Add Courses
                    </RouterLink>
                </Button>
            </div>
            
            <Card className="w-full sm:w-3/4 md:w-1/2 mb-4">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Your Stats</h2>
                </CardHeader>
                <CardContent>
                    <div className="divide-y">
                        <div className="pb-4">
                            <h3 className="text-xl font-bold mb-5">Passed Overview</h3>
                            <div className="mb-4">
                                <div className="text-sm font-medium text-muted-foreground">Average</div>
                                <div className="text-2xl font-bold">{currentGrade.toFixed(2)}</div>
                            </div>
                            
                            <div className={`mb-4 ${gpPassed >= 3 ? "text-green-300" : ""}`}>
                                <div className="text-sm font-medium">Passed Γενικης Παιδειας</div>
                                <div className="text-2xl font-bold">{gpPassed}/3</div>
                            </div>
                            
                            <div className={`mb-4 ${ypPassed >= 18 ? "text-green-300" : ""}`}>
                                <div className="text-sm font-medium">Passed Υποχρεωτικά</div>
                                <div className="text-2xl font-bold">{ypPassed}/18</div>
                            </div>
                            
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Category
                                            </th>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Υποχρεωτικά
                                            </th>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Bασικά
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={`${(s1YPassed >= 2 && s1BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S1</td>
                                            <td className="p-1">{s1YPassed}/2</td>
                                            <td className="p-1">{s1BPassed}/4</td>
                                        </tr>
                                        <tr className={`${(s2YPassed >= 2 && s2BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S2</td>
                                            <td className="p-1">{s2YPassed}/2</td>
                                            <td className="p-1">{s2BPassed}/4</td>
                                        </tr>
                                        <tr className={`${(s3YPassed >= 2 && s3BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S3</td>
                                            <td className="p-1">{s3YPassed}/2</td>
                                            <td className="p-1">{s3BPassed}/4</td>
                                        </tr>
                                        <tr className={`${(s4YPassed >= 2 && s4BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S4</td>
                                            <td className="p-1">{s4YPassed}/2</td>
                                            <td className="p-1">{s4BPassed}/4</td>
                                        </tr>
                                        <tr className={`${(s5YPassed >= 2 && s5BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S5</td>
                                            <td className="p-1">{s5YPassed}/2</td>
                                            <td className="p-1">{s5BPassed}/4</td>
                                        </tr>
                                        <tr className={`${(s6YPassed >= 2 && s6BPassed >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S6</td>
                                            <td className="p-1">{s6YPassed}/2</td>
                                            <td className="p-1">{s6BPassed}/4</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <h3 className="text-xl font-bold mb-5">Planned Overview</h3>
                            <div className={`mb-4 ${ectsPlannedSum >= 240 ? "text-green-300" : ""}`}>
                                <div className={`text-sm font-medium ${ectsPlannedSum >= 240 ? "text-green-300" : "text-muted-foreground"}`}>Planned ECTS</div>
                                <div className="text-2xl font-bold">{ectsPlannedSum}/240</div>
                            </div>
                            
                            <div className={`mb-4 ${gpPlanned === 3 ? "text-green-300" : ""}`}>
                                <div className={`text-sm font-medium ${gpPlanned === 3 ? "text-green-300" : "text-muted-foreground"}`}>Planned Γενικης Παιδειας</div>
                                <div className="text-2xl font-bold">{gpPlanned}/3</div>
                            </div>
                            
                            <div className={`mb-4 ${ypPlanned === 18 ? "text-green-300" : ""}`}>
                                <div className={`text-sm font-medium ${ypPlanned === 18 ? "text-green-300" : "text-muted-foreground"}`}>Planned Υποχρεωτικά</div>
                                <div className="text-2xl font-bold">{ypPlanned}/18</div>
                            </div>
                            
                            <div className="w-full overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Category
                                            </th>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Υποχρεωτικά
                                            </th>
                                            <th className="text-xs md:text-lg p-1 text-left font-medium">
                                                Bασικά
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={`${(s1YPlanned >= 2 && s1BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S1</td>
                                            <td className="p-1">{s1YPlanned}/2</td>
                                            <td className="p-1">{s1BPlanned}/4</td>
                                        </tr>
                                        <tr className={`${(s2YPlanned >= 2 && s2BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S2</td>
                                            <td className="p-1">{s2YPlanned}/2</td>
                                            <td className="p-1">{s2BPlanned}/4</td>
                                        </tr>
                                        <tr className={`${(s3YPlanned >= 2 && s3BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S3</td>
                                            <td className="p-1">{s3YPlanned}/2</td>
                                            <td className="p-1">{s3BPlanned}/4</td>
                                        </tr>
                                        <tr className={`${(s4YPlanned >= 2 && s4BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S4</td>
                                            <td className="p-1">{s4YPlanned}/2</td>
                                            <td className="p-1">{s4BPlanned}/4</td>
                                        </tr>
                                        <tr className={`${(s5YPlanned >= 2 && s5BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S5</td>
                                            <td className="p-1">{s5YPlanned}/2</td>
                                            <td className="p-1">{s5BPlanned}/4</td>
                                        </tr>
                                        <tr className={`${(s6YPlanned >= 2 && s6BPlanned >= 4) ? "bg-green-300 text-green-900" : ""}`}>
                                            <td className="p-1">S6</td>
                                            <td className="p-1">{s6YPlanned}/2</td>
                                            <td className="p-1">{s6BPlanned}/4</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}