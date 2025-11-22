#!/usr/bin/env node

import { spawn } from "child_process";

/**
 * Build watcher for TanStack Start success message
 * Monitors build output and exits when success message is detected
 */

// The exact message we're looking for
const SUCCESS_MESSAGE = "Client and Server bundles for TanStack Start have been successfully built";

const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m', 
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m'
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

/**
 * Run build command and monitor output for success message
 */
function runBuildWithWatcher() {
  log("🚀 Starting TanStack Start build with message watcher...", COLORS.BLUE);
  log(`📡 Watching for message: "${SUCCESS_MESSAGE}"`, COLORS.YELLOW);
  
  // Split the command properly for spawn
  const commands = [
    "paraglide-js compile --project ./project.inlang --outdir ./app/paraglide",
    "vite build"
  ];
  
  let currentCommandIndex = 0;
  
  function runNextCommand() {
    if (currentCommandIndex >= commands.length) {
      log("❌ Build completed but success message not found", COLORS.RED);
      process.exit(1);
      return;
    }
    
    const command = commands[currentCommandIndex];
    log(`\n⚡ Running: ${command}`, COLORS.BLUE);
    
    // Parse command and arguments
    const [cmd, ...args] = command.split(" ");
    
    const buildProcess = spawn(cmd, args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    });
    
    // Monitor stdout for success message
    buildProcess.stdout.on('data', (data) => {
      const output = data.toString();
      process.stdout.write(output); // Show output in real-time
      
      // Check if success message is found
      if (output.includes(SUCCESS_MESSAGE)) {
        log(`\n🎉 SUCCESS MESSAGE DETECTED!`, COLORS.GREEN);
        log(`✨ ${SUCCESS_MESSAGE}`, COLORS.GREEN);
        log(`🛑 Force stopping process (success)`, COLORS.BLUE);
        
        // Kill the build process and exit
        buildProcess.kill();
        process.exit(0);
      }
    });
    
    // Monitor stderr for success message (some tools output to stderr)
    buildProcess.stderr.on('data', (data) => {
      const output = data.toString();
      process.stderr.write(output); // Show errors in real-time
      
      // Check if success message is found in stderr too
      if (output.includes(SUCCESS_MESSAGE)) {
        log(`\n🎉 SUCCESS MESSAGE DETECTED!`, COLORS.GREEN);
        log(`✨ ${SUCCESS_MESSAGE}`, COLORS.GREEN);
        log(`🛑 Force stopping process (success)`, COLORS.BLUE);
        
        // Kill the build process and exit
        buildProcess.kill();
        process.exit(0);
      }
    });
    
    // Handle process completion
    buildProcess.on('close', (code) => {
      if (code === 0) {
        log(`✅ Command completed: ${command}`, COLORS.GREEN);
        currentCommandIndex++;
        runNextCommand(); // Run next command
      } else {
        log(`❌ Command failed with code ${code}: ${command}`, COLORS.RED);
        process.exit(1);
      }
    });
    
    // Handle process errors
    buildProcess.on('error', (error) => {
      log(`❌ Process error: ${error.message}`, COLORS.RED);
      process.exit(1);
    });
  }
  
  // Start the first command
  runNextCommand();
}

/**
 * Handle process termination
 */
process.on('SIGINT', () => {
  log('\n🛑 Build process interrupted by user', COLORS.YELLOW);
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('\n🛑 Build process terminated', COLORS.YELLOW);
  process.exit(1);
});

// Start the build watcher
runBuildWithWatcher(); 