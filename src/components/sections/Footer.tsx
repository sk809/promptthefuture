const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold gradient-text">PROMPT THE FUTURE</h3>
            <p className="text-sm text-muted-foreground mt-1">
              12-13 February • Gulzar Group of Institutes
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2025 Prompt the Future. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
