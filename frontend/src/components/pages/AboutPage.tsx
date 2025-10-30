import { Award, Users, Factory, Heart } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
//import React from'react';

export function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on the quality of our ingredients and production processes.'
    },
    {
      icon: Users,
      title: 'Family Heritage',
      description: 'Our recipes have been passed down through generations, preserving authentic flavors.'
    },
    {
      icon: Factory,
      title: 'Modern Facilities',
      description: 'State-of-the-art manufacturing facilities with traditional cooking methods.'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every product is crafted with care and attention to detail.'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl mb-6">About Pabasara Products</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Since our founding, Pabasara Products has been dedicated to bringing you the authentic 
            taste of traditional Sri Lankan sweets and snacks. We combine time-honored recipes 
            with modern manufacturing standards to deliver exceptional quality products.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Pabasara Products began as a small family business with a simple mission: 
                to preserve and share the traditional flavors of Sri Lankan confectionery 
                with the world. What started in a modest kitchen has grown into a modern 
                manufacturing facility, but our commitment to authenticity remains unchanged.
              </p>
              <p>
                Our founder, inspired by childhood memories of grandmother's kitchen, 
                decided to document and perfect these traditional recipes. Today, we use 
                the same time-tested methods, enhanced with modern hygiene and quality 
                control standards.
              </p>
              <p>
                Every product we make carries the essence of Sri Lankan culture and 
                the warmth of family traditions. We take pride in using only the finest 
                local ingredients, supporting our farming communities while delivering 
                exceptional taste to our customers.
              </p>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1609819390597-783ccdfc2529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmb29kJTIwbWFudWZhY3R1cmluZyUyMGtpdGNoZW58ZW58MXx8fHwxNzU4NDcxMzkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Pabasara Products Manufacturing Facility"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
              To preserve and promote the rich culinary heritage of Sri Lanka by creating 
              exceptional traditional sweets and snacks that bring families together and 
              create lasting memories. We strive to be the most trusted name in authentic 
              Sri Lankan confectionery, both locally and internationally.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl text-primary mb-2">25+</div>
            <p className="text-muted-foreground">Years of Experience</p>
          </div>
          <div>
            <div className="text-4xl text-primary mb-2">50+</div>
            <p className="text-muted-foreground">Traditional Recipes</p>
          </div>
          <div>
            <div className="text-4xl text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}