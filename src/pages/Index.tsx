
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import ElementSidebar from '@/components/ElementSidebar';

const Index = () => {
  return (
    <div className="container mx-auto py-10">
      <FadeIn>
        <h1 className="text-4xl font-bold text-center mb-10">Builder Applications</h1>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <FadeIn delay={200}>
          <Card>
            <CardHeader>
              <CardTitle>Form Builder</CardTitle>
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
                <Button>Start Building Forms</Button>
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
        
        <FadeIn delay={300}>
          <Card>
            <CardHeader>
              <CardTitle>BeBuilder</CardTitle>
              <CardDescription>
                Build beautiful, feature-rich websites with BeBuilder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                From professional portfolio websites to glossy online shops, 
                BeBuilder provides you with all the tools you need to build 
                anything you want.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/be-builder">
                <Button variant="default">Try BeBuilder</Button>
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
        
        <FadeIn delay={400}>
          <Card>
            <CardHeader>
              <CardTitle>Element Sidebar</CardTitle>
              <CardDescription>
                Explore our element sidebar component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Check out our element sidebar with gradient header, featuring
                a customizable collection of UI elements that can be used in your
                projects.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => {
                document.getElementById('sidebar-preview')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                View Sidebar Preview
              </Button>
            </CardFooter>
          </Card>
        </FadeIn>
      </div>
      
      <div id="sidebar-preview" className="mt-20 mb-10">
        <h2 className="text-3xl font-bold text-center mb-8">Element Sidebar Preview</h2>
        <div className="flex justify-center">
          <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden h-[600px]">
            <ElementSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
