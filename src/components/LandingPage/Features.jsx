import React from "react";
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

const Features = () => {
  return (
    <div>
      <Timeline horizontal>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Code Storage with Markdown Support</Timeline.Title>
            <Timeline.Body>
              Store your code snippets with Markdown support, enabling easy
              formatting and documentation.
            </Timeline.Body>
            <Button color="gray" href="/about">
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Search Functionality</Timeline.Title>
            <Timeline.Body>
              Effortlessly search through your stored code snippets, making it
              simple to find what you need when you need it.
            </Timeline.Body>
            <Button color="gray" href="/about">
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>Version Control</Timeline.Title>
            <Timeline.Body>
              Implement version control to track changes and maintain a history
              of your code snippets, ensuring seamless collaboration and
              development.
            </Timeline.Body>
            <Button color="gray" href="/about">
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default Features;
