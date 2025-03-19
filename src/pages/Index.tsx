
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';

const Index = () => {
  return (
    <div className="container mx-auto py-10">
      <FadeIn>
        <h1 className="text-4xl font-bold text-center mb-10">Form Builder Application</h1>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <FadeIn delay={200}>
          <Card>
            <CardHeader>
              <CardTitle>Build Custom Forms</CardTitle>
              <CardDescription>
                Create and customize forms with our easy-to-use drag and drop builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our form builder lets you create custom forms for surveys, feedback, 
                applications, and more. Drag and drop components, customize their properties, 
                and preview your form in real-time.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/form-builder">
                <Button>Start Building</Button>
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
        
        <FadeIn delay={300}>
          <Card>
            <CardHeader>
              <CardTitle>Form Management</CardTitle>
              <CardDescription>
                Manage all your forms in one place
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                View your forms, analyze responses, and export data all in one centralized
                dashboard. Get valuable insights from responses and share them with your team.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Dashboard</Button>
            </CardFooter>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default Index;
